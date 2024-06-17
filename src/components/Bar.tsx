'use client' 
import React from 'react';
import { ApexOptions } from 'apexcharts';
import  Apex  from '@/client/Charts';
import { Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'

const BarChart: React.FC = () => {
    const toast = useToast()
    const series = [{
        name: 'serie1',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
    }];

    const options: ApexOptions = {
        chart: {
            id: 'basic-bar'
        },
        xaxis: {
            categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep']
        }
    };

    return (
        <div className='app' style={{ backgroundColor: "#fff" }} >
            <Apex options={options} series={series} type="bar" width="500" height="320" />
            <Button onClick={() =>
                toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            } colorScheme='blue'> Toast </Button>
        </div>
    );
};

export default BarChart;
