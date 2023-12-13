export function CheckIfUserEmailIsInLikesArray({ newLikesArray, user_email }: { newLikesArray: string[]; user_email: string }) {
  return newLikesArray?.includes(user_email) ? true : false;
}
