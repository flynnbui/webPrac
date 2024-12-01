import React, { useEffect, useState } from 'react'
import PageFooter from '@/components/PageFooter'
import PageHeader from '@/components/PageHeader'
import { Button, Input, message } from 'antd'


export const strs = [
    'the fat cats',
    'larger frogs',
    'banana cakes',
    'unsw vs usyd',
    'french toast',
    'hawaii pizza',
    'barack obama',
]

function Blanko() {
    // State to manage game state
    const [displayString, setDisplayString] = useState('')
    const [inputPositions, setInputPositions] = useState([])
    const [inputValues, setInputValues] = useState(['', '', ''])
    const [correctString, setCorrectString] = useState('')

    // Initialize the game
    const initializeGame = () => {
        // Randomly select a string
        const randomStr = strs[Math.floor(Math.random() * strs.length)]
        const uppercaseStr = randomStr.toUpperCase().replace(/\s/g, ' ')
        setCorrectString(uppercaseStr)

        // Create display string with input positions
        const strArray = uppercaseStr.split('')
        const nonSpaceChars = strArray.filter(char => char !== ' ')

        // Randomly select 3 non-space character positions
        const randomPositions = []
        while (randomPositions.length < 3) {
            const randomPos = Math.floor(Math.random() * nonSpaceChars.length)
            if (!randomPositions.includes(randomPos)) {
                randomPositions.push(randomPos)
            }
        }

        // Replace selected positions with spaces in display
        const displayArr = [...strArray]
        randomPositions.forEach(pos => {
            const actualPos = strArray.indexOf(nonSpaceChars[pos])
            displayArr[actualPos] = ' '
        })

        setDisplayString(displayArr.join(''))
        setInputPositions(randomPositions.map(pos =>
            strArray.indexOf(nonSpaceChars[pos])
        ))
        setInputValues(['', '', ''])
    }

    // Handle input changes
    const handleInputChange = (index, value) => {
        const newInputValues = [...inputValues]
        newInputValues[index] = value.toUpperCase()
        setInputValues(newInputValues)

        // Check if all inputs are filled
        if (newInputValues.every(val => val.length === 1)) {
            // Verify inputs
            const correctChars = inputPositions.map(pos => correctString[pos])
            const isCorrect = newInputValues.every((val, idx) =>
                val === correctChars[idx]
            )

            if (isCorrect) {
                message.success("Correct!")
                const savedScore = localStorage.getItem('score');
                localStorage.setItem('score', (savedScore + 1).toString());
                initializeGame()
            }
        }
    }

    // Initialize game on mount
    useEffect(() => {
        initializeGame()
    }, [])

    return (
        <div className="flex flex-col w-screen h-screen">
            <PageHeader />
            <div className="flex flex-1 items-center justify-center w-full">
                <div className="text-center flex flex-col items-center">
                    <div className="flex space-x-2 mb-4">
                        {displayString.split('').map((char, index) => (
                            <div
                                key={index}
                                className="w-12 h-12 border flex items-center justify-center"
                            >
                                {inputPositions.includes(index) ? (
                                    <Input
                                        maxLength={1}
                                        value={inputValues[inputPositions.indexOf(index)]}
                                        onChange={(e) => handleInputChange(
                                            inputPositions.indexOf(index),
                                            e.target.value
                                        )}
                                        className="text-center w-full h-full"
                                    />
                                ) : (
                                    <span>{char}</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <Button
                        className="bg-red-800 text-white mt-4"
                        onClick={initializeGame}
                    >
                        Reset
                    </Button>
                </div>
            </div>
            <PageFooter />
        </div>
    )
}

export default Blanko