"use client";
import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ChevronLeft, ChevronRight } from '@mui/icons-material/';
import { Button } from '@mui/base';

function DateChanger() {

    const [date, setDate] = useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex flex-row gap-2">
            <Button
                className='bg-[#a9a9a9] rounded-[0.2rem] px-2 hover:bg-[#777777]'
                onClick={() => setDate(dayjs().subtract(1, 'day'))}
            >
                <ChevronLeft /> Gestern
            </Button>
            <Button
                className='bg-[#a9a9a9] rounded-[0.2rem] px-4 hover:bg-[#777777]'
                onClick={() => setDate(dayjs())}
            >
                Heute
            </Button>
            <DatePicker sx={{
                '.MuiInputBase-root': {
                    backgroundColor: 'darkgrey',
                },
                }}
                value={date}
                onChange={(newValue) => {
                    setDate(newValue);
                }}
                format='DD.MM.YYYY'
            />
            <Button 
                className='bg-[#a9a9a9] rounded-[0.2rem] px-2 hover:bg-[#777777]'
                onClick={() => setDate(dayjs().add(1, 'day'))}
            >
                Morgen <ChevronRight />
            </Button>
        </div>
    </LocalizationProvider>
  )
}

export default DateChanger
