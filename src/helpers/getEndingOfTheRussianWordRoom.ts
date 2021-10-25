export default (value: number) => {
  if (value % 100 > 10 && value % 100 <= 20) {
    return ''
  }

  const roomsLowestDigit = value % 10

  switch (roomsLowestDigit) {
    case 0:
    case 6:
    case 7:
    case 8:
    case 9:
      return ''
    case 1:
      return 'а'
    case 2:
    case 3:
    case 4:
      return 'ы'
  }
}