import React, { useState, useEffect } from 'react'
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
import { Button, message } from 'antd'

// Import Shrek images
import shrek1 from '@/assets/1.png'
import shrek2 from '@/assets/2.png'
import shrek3 from '@/assets/3.png'
import shrek4 from '@/assets/4.png'
import shrek5 from '@/assets/5.png'
import shrek6 from '@/assets/6.png'
import shrek7 from '@/assets/7.png'
import shrek8 from '@/assets/8.png'

const SOLVED_GRID = [
    shrek1, shrek2, shrek3,
    shrek4, shrek5, shrek6,
    shrek7, shrek8, null
]

function Slido() {
    const [grid, setGrid] = useState([])
    const [blankIndex, setBlankIndex] = useState(0)
    const [isGameStarted, setIsGameStarted] = useState(false)
    const [isGameSolved, setIsGameSolved] = useState(false)

    // Shuffle the grid
    const shuffleGrid = () => {
        const images = [shrek1, shrek2, shrek3, shrek4, shrek5, shrek6, shrek7, shrek8]
        const shuffled = [...images]

        // Fisher-Yates shuffle
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }


        // Add null (blank space)
        shuffled.push(null)

        // Randomly place the blank space
        const blankPos = Math.floor(Math.random() * 9)
        const finalGrid = [...shuffled]
        finalGrid.splice(blankPos, 0, null)

        setGrid(finalGrid)
        setBlankIndex(blankPos)
        setIsGameStarted(false)
        setIsGameSolved(false)
    }

    // Initialize game on mount
    useEffect(() => {
        shuffleGrid()
    }, [])

    useEffect(() => {
        if (!isGameStarted || isGameSolved) return
    }, [blankIndex, isGameStarted, isGameSolved])

    // Check if game is solved
    const checkSolved = (currentGrid) => {
        return currentGrid.slice(0, 8).every((cell, index) => cell === SOLVED_GRID[index])
    }

    // Move cell logic
    const moveCell = (targetIndex) => {
        if (!isGameStarted) setIsGameStarted(true)

        // Check if move is valid
        const validMoves = getValidMoves(blankIndex)
        if (!validMoves.includes(targetIndex)) return

        // Create new grid and swap
        const newGrid = [...grid]
        newGrid[blankIndex] = newGrid[targetIndex]
        newGrid[targetIndex] = null

        setGrid(newGrid)
        setBlankIndex(targetIndex)

        // Check if solved
        if (checkSolved(newGrid)) {
            setTimeout(() => {
                message.success('Correct!')
                const savedScore = parseInt(localStorage.getItem('score') || '0')
                localStorage.setItem('score', (savedScore + 1).toString())
                setIsGameSolved(true)
            }, 100)
        }
    }

    // Get valid moves around blank space
    const getValidMoves = (blankPos) => {
        const moves = []
        const row = Math.floor(blankPos / 3)
        const col = blankPos % 3

        // Check up
        if (row > 0) moves.push(blankPos - 3)
        // Check down
        if (row < 2) moves.push(blankPos + 3)
        // Check left
        if (col > 0) moves.push(blankPos - 1)
        // Check right
        if (col < 2) moves.push(blankPos + 1)

        return moves
    }

    // Solve the puzzle automatically
    const autoSolve = () => {
        setGrid(SOLVED_GRID)
        setBlankIndex(8)
        setIsGameSolved(true)
    }

    return (
        <div
            className="flex flex-col w-screen h-screen"
        >
            <PageHeader />
            <div className="flex flex-1 items-center justify-center w-full">
                <div className="flex flex-col items-center">
                    {/* Grid */}
                    <div
                        className="grid grid-cols-3 gap-0 border-none"
                        style={{
                            width: '450px',
                            height: '450px'
                        }}
                    >
                        {grid.map((image, index) => (
                            <div
                                key={index}
                                className="w-[150px] h-[150px] border border-[#333]"
                                onClick={() => moveCell(index)}
                            >
                                {image ? (
                                    <img
                                        src={image}
                                        alt={`Shrek square ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : null}
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex w-full justify-between mt-4">
                        <Button
                            className="w-1/2 mr-2"
                            onClick={autoSolve}
                            disabled={isGameSolved}
                        >
                            Solve
                        </Button>
                        <Button
                            className="w-1/2 ml-2"
                            onClick={shuffleGrid}
                            disabled={!isGameStarted && !isGameSolved}
                        >
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
            <PageFooter />
        </div>
    )
}

export default Slido
