const {calculateBabysitterPay, calculateStartTimePay, calculateBedTimePay, calculateAfterMidnightPay} = require('./babysitterPayCalculator.js')
const {
    BABYSITTER_CANNOT_START_BEFORE_5PM, 
    BED_TIME_CANNOT_BE_BEFORE_START_TIME,
    END_TIME_CANNOT_BE_BEFORE_BED_TIME,
    END_TIME_CANNOT_BE_AFTER_4AM,
    ENTERED_TIMES_CANNOT_BE_FRACTIONAL_HOURS
} = require("./errorMessages.js")  

const TWO_AM = 14
const THREE_AM = 15
const FOUR_AM = 16 
const FIVE_AM = 17

test('Babysitter cannot start earlier than 5pm', () => {
  expect(() => calculateBabysitterPay(4, 7, 10)).toThrow(
      BABYSITTER_CANNOT_START_BEFORE_5PM,
  )
  expect(() => calculateBabysitterPay(3, 11, 12)).toThrow(
      BABYSITTER_CANNOT_START_BEFORE_5PM,
    )
    expect(() => calculateBabysitterPay(6, 2, 1)).toThrow(
      BABYSITTER_CANNOT_START_BEFORE_5PM,
    )
})

test('Babysitter cannot leave later than 4am', () => {
  expect(() => calculateBabysitterPay(6, 7, FIVE_AM)).toThrow(
      END_TIME_CANNOT_BE_AFTER_4AM,
  )
})

test('Babysitter cannot get bed time pay past midnight', () => {
  expect(calculateBedTimePay(12, THREE_AM)).toEqual(0)
  expect(calculateBedTimePay(THREE_AM, FOUR_AM)).toEqual(0)
})

test('Babysitter cannot enter fractional hours', () => {
  expect(() => calculateBabysitterPay(5.4, 7, 10)).toThrow(
      ENTERED_TIMES_CANNOT_BE_FRACTIONAL_HOURS,
    )
    expect(() => calculateBabysitterPay(5, 7.1, 10)).toThrow(
      ENTERED_TIMES_CANNOT_BE_FRACTIONAL_HOURS,
    )
    expect(() => calculateBabysitterPay(5, 7, 10.9)).toThrow(
      ENTERED_TIMES_CANNOT_BE_FRACTIONAL_HOURS,
    )
})

test('Bed time cannot be before start time', () => {
  expect(() => calculateBabysitterPay(8, 7, 12)).toThrow(
      BED_TIME_CANNOT_BE_BEFORE_START_TIME,
  )
})

test('End time cannot be before bed time', () => {
  expect(() => calculateBabysitterPay(8, 12, 11)).toThrow(
      END_TIME_CANNOT_BE_BEFORE_BED_TIME,
  )
}) 

test('Calculates start time pay correctly', () => {
  expect(calculateStartTimePay(6, 8)).toEqual(24)
  expect(calculateStartTimePay(6, 7)).toEqual(12)
  expect(calculateStartTimePay(5, 12)).toEqual(84)
  expect(calculateStartTimePay(5, TWO_AM)).toEqual(84)
  expect(calculateStartTimePay(12, TWO_AM)).toEqual(0)
})

test('Calculates bed time pay correctly', () => {
  expect(calculateBedTimePay(5, 11)).toEqual(48)
  expect(calculateBedTimePay(7, TWO_AM)).toEqual(40)
  expect(calculateBedTimePay(11, 12)).toEqual(8)
  expect(calculateBedTimePay(TWO_AM, THREE_AM)).toEqual(0)
})

test('Calculates after midnight pay correctly', () => {
  expect(calculateAfterMidnightPay(6)).toEqual(0)
  expect(calculateAfterMidnightPay(12)).toEqual(0)
  expect(calculateAfterMidnightPay(TWO_AM)).toEqual(32)
  expect(calculateAfterMidnightPay(FOUR_AM)).toEqual(64)
})

test('Calculates total pay correctly', () => {
  expect(calculateBabysitterPay(6, 8, 11)).toEqual(48)
  expect(calculateBabysitterPay(6, 11, 13)).toEqual(84)
  expect(calculateBabysitterPay(7, 7, 10)).toEqual(24)
})

  

  
  