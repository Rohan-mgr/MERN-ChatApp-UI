
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
