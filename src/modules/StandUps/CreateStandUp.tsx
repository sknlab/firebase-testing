import { Button, Flex, FormControl, FormErrorMessage, HStack, Spinner, Textarea, useToast, Text, Heading, Switch, VStack } from "@chakra-ui/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useCreateStandUp, getUserLatestStandUpQuery } from "@/hooks/StandUps.api";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/modules/Layout/Layout";
import { format } from "date-fns";
import { PreviousStandUp } from "@/modules/StandUps/PreviousStandUp";
import { CreateStandUpType } from "@/types/standUps.types";

export default function CreateStandUp() {
  const { user } = useContext(AuthContext);
  const createStandUp = useCreateStandUp();

  const toast = useToast();
  const navigate = useNavigate();
  const today = format(new Date(), "EEEE, d MMMM yyyy");
  const [latestStandUp, setLatestStandUp] = useState<CreateStandUpType | null>(null);

  useEffect(() => {
    const fetchLatestStandUp = async () => {
      try {
        const latestStandUpData = await getUserLatestStandUpQuery(user.email);
        setLatestStandUp(latestStandUpData);
      } catch (error) {
        handleError;
      }
    };

    if (user) {
      fetchLatestStandUp();
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm({ mode: "all" });
  const hasBlockers = watch("hasBlockers", false);
  const hasQuestions = watch("hasQuestions", false);

  const handleSuccess = (id: string | null | undefined) => {
    toast({
      title: "Creation Success.",
      description: `Stand up ID ${id} created successfully `,
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };

  const handleError = () => {
    toast({
      title: "Error!",
      description: "An error occurred",
      status: "error",
      position: "top",
      duration: 4000,
      isClosable: true,
    });
  };

  const onSubmit = async (standUp: { todaysPlan: string; blockers?: string; questions?: string; previousPlanExceeded?: string; previousPlanAccomplished?: string }) => {
    const data = {
      user_uid: user.uid,
      user_email: user.email,
      todaysPlan: standUp.todaysPlan,
      blockers: standUp.blockers || "None",
      questions: standUp.questions || "None",
      previousPlanExceeded: standUp.previousPlanExceeded || "None",
      previousPlanAccomplished: standUp.previousPlanAccomplished || "None",
    };
    const res = await createStandUp.mutateAsync(data);
    if (res) {
      handleSuccess(res?.id);
      navigate(`/`);
      reset({
        todaysPlan: "",
        blockers: "",
        questions: "",
      });
    }
    if (createStandUp?.isError) {
      handleError();
    }
  };

  return (
    <Layout>
      <HStack spacing={6} w="90%" mx="auto" mb={8} background="#fafafa">
        <VStack spacing={6} alignItems="start" width="100%">
          <VStack alignItems="start">
            <Heading size="md">Stand-up</Heading>
            <Text fontSize="14px" color="grey">
              {today}
            </Text>
          </VStack>
          <Text fontSize="14px">Please answer the following questions to complete stand up</Text>
          {latestStandUp !== null && <PreviousStandUp watch={watch} register={register} errors={errors} prevStandUp={latestStandUp} />}
          <FormControl>
            <Textarea fontSize="14px" isRequired {...register("todaysPlan", { required: { value: true, message: "This field is required " } })} placeholder="What do you plan to do today?" bgColor="white" />
            {errors?.todaysPlan && <FormErrorMessage>This field is required</FormErrorMessage>}
          </FormControl>

          <FormControl>
            <HStack alignItems="center" justifyContent="space-between" border="1px" borderRadius={4} p={4} borderColor="#e2e8f0" bg="white">
              <Text fontSize="14px">Do you have any blockers?</Text>
              <HStack spacing={2} alignItems="center">
                <Text fontSize="14px" color="grey">
                  {hasBlockers ? "Yes" : "No"}
                </Text>
                <Switch size="md" {...register("hasBlockers")} />
              </HStack>
            </HStack>

            {hasBlockers && <Textarea fontSize="14px" isRequired {...register("blockers", { required: { value: true, message: "This field is required " } })} bg="white" />}
            {errors?.blockers && <FormErrorMessage>This field is required</FormErrorMessage>}
          </FormControl>
          <FormControl>
            <HStack alignItems="center" justifyContent="space-between" border="1px" borderRadius={4} p={4} borderColor="#e2e8f0" bg="white">
              <Text fontSize="14px">Do you have any questions?</Text>
              <HStack spacing={2} alignItems="center">
                <Text fontSize="14px" color="grey">
                  {hasQuestions ? "Yes" : "No"}
                </Text>
                <Switch size="md" {...register("hasQuestions")} />
              </HStack>
            </HStack>

            {hasQuestions && <Textarea fontSize="14px" isRequired {...register("questions", { required: { value: true, message: "This field is required " } })} bg="white" />}
            {errors?.questions && <FormErrorMessage>This field is required</FormErrorMessage>}
          </FormControl>
          <Flex justifyContent="space-between" alignItems="center" minWidth="100%">
            <Button isDisabled={isDirty && !isValid} onClick={handleSubmit(onSubmit as SubmitHandler<FieldValues>)} px={4} colorScheme="facebook" size="md">
              {createStandUp?.isPending ? (
                <Flex gap={2}>
                  Saving <Spinner size="sm" />
                </Flex>
              ) : (
                `Save Standup`
              )}
            </Button>

            <Text fontSize="sm" as={Link} to="/">
              See team members stand-ups &gt;
            </Text>
          </Flex>
        </VStack>
      </HStack>
    </Layout>
  );
}
