import { CreateStandUpType } from "@/types/standUps.types";
import { Box, Card, CardBody, FormControl, FormErrorMessage, HStack, Heading, Switch, Text, Textarea, VStack } from "@chakra-ui/react";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";
import format from "date-fns/format";
import LoadingSpinner from "@/components/Spinner/LoadingSpinner";

interface PreviousStandUpProps {
  watch: UseFormWatch<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  prevStandUp?: CreateStandUpType | null;
}

export const PreviousStandUp: React.FC<PreviousStandUpProps> = ({ watch, register, errors, prevStandUp }) => {
  const completedGoals = watch("completedGoals", false);
  const exceededGoals = watch("exceededGoals", false);
  const createdAtDate = prevStandUp?.createdAt?.toDate() || null;
  const dayOfWeek = createdAtDate ? format(createdAtDate, "EEEE") : null;

  return (
    <Box minW="100%">
      {prevStandUp ? (
        <VStack minWidth="100%" alignItems="flex-start" spacing={0}>
          <Card minWidth="100%" shadow="none" border="1px" borderBottom="0px" borderColor="#e2e8f0">
            <CardBody>
              <Heading textTransform="uppercase" size="xs" color="green.500" lineHeight="20px">
                {dayOfWeek}'s Goal
              </Heading>

              <Text fontSize="14px">{prevStandUp?.todaysPlan}</Text>
            </CardBody>
          </Card>

          <FormControl>
            <HStack alignItems="center" justifyContent="space-between" border="1px" borderRadius={4} p={4} borderColor="#e2e8f0" mb={6} bg="white">
              <Text fontSize="14px">Did you meet instert date here goal?</Text>
              <HStack spacing={2} alignItems="center">
                <Text fontSize="14px" color="grey">
                  {completedGoals ? "Yes" : "No"}
                </Text>
                <Switch size="md" {...register("completedGoals")} />
              </HStack>
            </HStack>
            {completedGoals ? (
              <HStack alignItems="center" justifyContent="space-between" border="1px" borderRadius={4} p={4} borderColor="#e2e8f0" bg="white">
                <Text fontSize="14px">Did you complete any additional tasks on insert date?</Text>
                <HStack spacing={2} alignItems="center">
                  <Text fontSize="14px" color="grey">
                    {exceededGoals && completedGoals ? "Yes" : "No"}
                  </Text>
                  <Switch size="md" {...register("exceededGoals")} />
                </HStack>
              </HStack>
            ) : (
              <FormControl>
                <Textarea fontSize="14px" bg="white" placeholder={dayOfWeek ? `What did you do ${dayOfWeek}?` : "What did you do Yesterday?"} isRequired {...register("previousPlanAccomplished", { required: { value: true, message: "This field is required " } })} bgColor="white" />
                {errors?.previousPlanAccomplished && <FormErrorMessage>This field is required</FormErrorMessage>}
              </FormControl>
            )}
            {exceededGoals && completedGoals && <Textarea fontSize="14px" placeholder="What additional tasks did you complete?" isRequired {...register("previousPlanExceeded", { required: { value: true, message: "This field is required " } })} bg="white" />}
            {errors?.previousPlanExceeded && <FormErrorMessage>This field is required</FormErrorMessage>}
          </FormControl>
        </VStack>
      ) : (
        <LoadingSpinner />
      )}
    </Box>
  );
};
