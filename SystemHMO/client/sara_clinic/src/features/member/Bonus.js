import { getNumSicks } from "./bonusApi"
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart'
import { useState, useEffect } from "react";
const Bonus = () => {
    const [numSicks, setNumSicks] = useState([]);

    const getNumSicksPerMonth = async () => {
        try {
            let sicksData = await getNumSicks();
            setNumSicks(sicksData.data);
        }
        catch (error) {
            console.log('לא הצליח', error);
        }
    };
        const dataForChart =numSicks && Array.isArray(numSicks) ?  {
            series: [{ data: numSicks,},],
            xAxis: [
                {
                    data: numSicks.map((_, index) => `Day ${index + 1}`),
                    scaleType: 'band',
                },
            ],
         } : { series: [], xAxis: [] };

    return (
        <>
            <input type='button' value="Reload Data" onClick={getNumSicksPerMonth} />
             {numSicks.length>0&&<BarChart
               
                series={dataForChart.series}
                height={290}
                xAxis={dataForChart.xAxis}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />}
           
             
        </>
    );
}


export default Bonus;