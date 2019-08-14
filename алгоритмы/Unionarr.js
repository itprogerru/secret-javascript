



export const unionContacts2 = (data) => {
  const newMap = {};
  const newArr = [];
  data.forEach(item => {
    if (!(item.contactType in newMap)) {
      newMap[item.contactType] = [];
    }
    if (item.person) {
      newMap[item.contactType].push(item.person)
    }
    if (item.group) {
      newMap[item.contactType] = newMap[item.contactType].concat(item.group.persons)
    }
  })
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in newMap) {
    newArr.push({
      contactType: key,
      persons: newMap[key]
    })
  }
  return newArr;
}
