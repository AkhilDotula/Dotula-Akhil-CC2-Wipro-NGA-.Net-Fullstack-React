

export const createFriend = (friendArray, friendObj) => {
    return [...friendArray, friendObj];
  };
  
  export const editFriend = (friendArray, friendId, name) => {
    return friendArray.map((friend) =>
      friend.id === friendId ? { ...friend, name: name } : friend
    );
  };
  
  export const removeFriendFromArray = (friendArray, friendId) => {
    return friendArray.filter((friend) => friend.id !== friendId);
  };
  