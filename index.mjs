#!/usr/bin/env node
import inquirer from 'inquirer'
import { calculateBabysitterPay } from './babysitterPayCalculator.js'
import timeChoices from './timeChoices.js'

async function askForBabysittingTimes() {
    const startTime = await inquirer.prompt({
        name: 'value',
        type: 'list',
        message: 'What Time Did You Start Babysitting?',
        choices: timeChoices,
    })

    const postStartTimeChoices = timeChoices.filter(timeChoice => timeChoice.value >= startTime.value)
    const bedTime = await inquirer.prompt({
        name: 'value',
        type: 'list',
        message: 'What Time Did The Child(ren) Go To Bed?',
        choices: postStartTimeChoices,
    })

    const postEndTimeChoices = timeChoices.filter(timeChoice => timeChoice.value >= bedTime.value)
    const endTime = await inquirer.prompt({
        name: 'value',
        type: 'list',
        message: 'When Did You Leave?',
        choices: postEndTimeChoices,
    })

    const calculatedPay = calculateBabysitterPay(startTime.value, bedTime.value, endTime.value)
    console.log(`Your Total Pay: $${calculatedPay}`)
}

await askForBabysittingTimes();


