const validateTimes = require("./babysitterPayCalculatorValidations")

const START_TIME_RATE = 12
const BED_TIME_RATE = 8
const AFTER_MIDNIGHT_RATE = 16
const MIDNIGHT = 12

const calculateBabysitterPay = (
  startTime,
  bedTime,
  endTime,
) => {
  validateTimes(startTime, bedTime, endTime)
  return calculatePay(startTime, bedTime, endTime)
}

const calculatePay = (startTime, bedTime, endTime) => 
    calculateStartTimePay(startTime, bedTime) +
    calculateBedTimePay(bedTime, endTime) +
    calculateAfterMidnightPay(endTime)

const calculateStartTimePay = (startTime, bedTime) =>
    getHoursFromStartTimeToBedTime(startTime, bedTime) * START_TIME_RATE

const calculateBedTimePay = (bedTime, endTime) =>
    MIDNIGHT <= endTime
        ? getHoursFromBedTimeToMidnight(bedTime) * BED_TIME_RATE
        : getHoursBetweenTimes(bedTime, endTime) * BED_TIME_RATE

const calculateAfterMidnightPay = (endTime) =>
  getHoursFromMidnightToEndTime(endTime) * AFTER_MIDNIGHT_RATE


const getHoursFromStartTimeToBedTime = (startTime, bedTime) =>
  isAfterMidnight(bedTime) ? MIDNIGHT - startTime : bedTime - startTime

const getHoursFromBedTimeToMidnight = (bedTime) =>
  isAfterMidnight(bedTime) ? 0 : MIDNIGHT - bedTime

const getHoursFromMidnightToEndTime = (endTime) =>
  isAfterMidnight(endTime) ? endTime - MIDNIGHT : 0

const getHoursBetweenTimes = (startTime, endTime) => endTime - startTime

const isAfterMidnight = (time) => time > MIDNIGHT

module.exports = {calculateBabysitterPay, calculateStartTimePay, calculateBedTimePay, calculateAfterMidnightPay};