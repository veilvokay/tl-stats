import React, { useEffect, useState } from 'react';
import { EStatType, ISortedStats, IStatsData } from '../../bff/fetch-stats';
import dataJSON from '../../mocks/stats.json';
import ChangeStat from '../ChangeStat';
import './page.sass';

interface ChangeStatsWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string,
    children: JSX.Element | JSX.Element[]
}

const ChangeStatsWrapper = ({title, children}: ChangeStatsWrapperProps) => (
    <div className='change-stats-wrapper'>
        {children}
    </div>
)

const Page = () => {
    const [sortedData, setSortedData] = useState<ISortedStats>();

    useEffect(() => {
        if (!sortedData) {
            const sorted = sortData(dataJSON);
            setSortedData(sorted);
        }
    }, [sortedData]);

  return (
    <div className="page">
        {sortedData && (
            <ChangeStatsWrapper>
                <ChangeStat specificStat={sortedData?.STR} />
                <ChangeStat specificStat={sortedData?.DEX} />
                <ChangeStat specificStat={sortedData?.INT} />
                <ChangeStat specificStat={sortedData?.PER} />
            </ChangeStatsWrapper>
        )}
    </div>
  )
}

export default Page

const sortData = (data: IStatsData[]) => {
    const sortedStats: ISortedStats = {
        STR: [],
        DEX: [],
        INT: [],
        PER: []
    };

    data.forEach((item: IStatsData) => {
        switch (item.Type) {
            case EStatType.STR:
                sortedStats.STR.push(item);
                break;
            case EStatType.DEX:
                sortedStats.DEX.push(item);
                break;
            case EStatType.INT:
                sortedStats.INT.push(item);
                break;
            case EStatType.PER:
                sortedStats.PER.push(item);
                break;
        }
    });

    return sortedStats;
}