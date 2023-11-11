// export const isSameSender = (messages, m, i, userId) => {
//   console.log(messages);
//   return (
//     (i < messages.length - 1 &&
//       messages[i + 1]?.sender?._id !== m.sender?._id) ||
//     (messages[i + 1]?.sender?._id === undefined &&
//       messages[i]?.sender?._id !== userId)
//   );
// };

// export const isLastMessage = (messages, index, userId) => {
//   console.log(messages, index, userId);
//   return (
//     index === messages.length - 1 &&
//     messages[messages.length - 1]?.sender?._id !== userId &&
//     messages[messages.length - 1]?.sender?._id
//   );
// };

export const isSameSender = (messages, i, userId) => {
  return (
    i > 0 && // Check if i is greater than 0 to avoid negative index
    messages[i].sender._id === messages[i - 1].sender._id &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 && // Check if it's the last message
    messages[i].sender._id !== userId
  );
};
