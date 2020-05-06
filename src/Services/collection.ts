export const getCollectionItemSubTitle = (count: number): string => {
  if (count === 1) {
    return `${count} record`;
  } else if (count > 1) {
    return `${count} records`;
  } else {
    return 'No records';
  }
};
