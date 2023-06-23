const { 
    BABYSITTER_CANNOT_START_BEFORE_5PM, 
    BED_TIME_CANNOT_BE_BEFORE_START_TIME, 
    END_TIME_CANNOT_BE_BEFORE_BED_TIME,
    END_TIME_CANNOT_BE_AFTER_4AM,
    ENTERED_TIMES_CANNOT_BE_FRACTIONAL_HOURS
} = require("./errorMessages.js")
const timeChoices = require('./timeChoices.js')

const validateTimes = (startTime, bedTime, endTime) => {
    validateNoTimeBefore5pm(startTime, bedTime, endTime)
    validateBedTimeIsNotBeforeStartTime(startTime, bedTime)
    validateEndTimeIsNotBeforeBedTime(bedTime, endTime)
    validateEndTimeIsNotPast4am(endTime)
    validateNoTimeIsFractional([startTime, bedTime, endTime])
}
  
const validateNoTimeBefore5pm = (startTime, bedTime, endTime) => {
    const fivePm = timeChoices.find(time => time.name === '5 PM').value
    if ([startTime, bedTime, endTime].some(time => time < fivePm)) {
        throw new Error(BABYSITTER_CANNOT_START_BEFORE_5PM)
    }
}

const validateBedTimeIsNotBeforeStartTime = (startTime, bedTime) => {
    if(bedTime < startTime){
        throw new Error(BED_TIME_CANNOT_BE_BEFORE_START_TIME)
    }
}

const validateEndTimeIsNotBeforeBedTime = (bedTime, endTime) => {
    if(endTime < bedTime){
        throw new Error(END_TIME_CANNOT_BE_BEFORE_BED_TIME)
    }
}

const validateEndTimeIsNotPast4am = (endTime) => {
    if (endTime > timeChoices.find(time => time.name === '4 AM').value) {
        throw new Error(END_TIME_CANNOT_BE_AFTER_4AM)
    }
}

const validateNoTimeIsFractional = (times) => {
    if (!times.every(isTimeValid)){
        throw new Error(ENTERED_TIMES_CANNOT_BE_FRACTIONAL_HOURS)
    }
}

const isTimeValid = (time) => isTimeWholeNumber(time) && isTimeValidHour(time)
const isTimeWholeNumber = (time) => time % 1 === 0
const isTimeValidHour = (time) => time >= 0 && time < 24

module.exports = validateTimes