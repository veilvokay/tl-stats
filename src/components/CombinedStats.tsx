import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { EStatType, ISortedStats, IStatsData, Stat } from '../bff/fetch-stats';
import { mergeObjects, trimStatName } from '../helpers/helpers';
import dataJSON from '../mocks/stats.json';
import './CombinedStats.sass';
import Button from './layout/Button';
const CombinedStats = () => {
    const [sortedData, setSortedData] = useState<ISortedStats>({
        STR: [],
        DEX: [],
        INT: [],
        PER: []
    });
    const currSortedData = useRef(sortedData);
    const [assembledData, setAssembledData] = useState<Stat>({});
    const assembledDataRef = useRef(assembledData);
    const titleSTR = useRef(trimStatName(EStatType.STR));
    const titleDEX = useRef(trimStatName(EStatType.DEX));
    const titleINT = useRef(trimStatName(EStatType.INT));
    const titlePER = useRef(trimStatName(EStatType.PER))
    const [currSTRIndex, setCurrSTRIndex] = useState(1);
    const [currDEXIndex, setCurrDEXIndex] = useState(1);
    const [currINTIndex, setCurrINTIndex] = useState(1);
    const [currPERIndex, setCurrPERIndex] = useState(1);
    const currSTRIndexRef = useRef(1);
    const currDEXIndexRef = useRef(1);
    const currINTIndexRef = useRef(1);
    const currPERIndexRef = useRef(1);

    useEffect(() => {
        if (_.isEqual(currSortedData.current, sortedData)) {
            const sorted = sortData(dataJSON);
            setSortedData(sorted);
        }
    }, [sortedData]);

    // SUM UP STATS
    useEffect(() => {
        const stats: Stat[] = [];

        sortedData.STR.map(el => {
            if (el.Point === currSTRIndex) {
                stats.push(el.Stat);
            }
        })
        sortedData.DEX.map(el => {
            if (el.Point === currDEXIndex) {
                stats.push(el.Stat);
            }
        })
        sortedData.INT.map(el => {
            if (el.Point === currINTIndex) {
                stats.push(el.Stat);
            }
        })
        sortedData.PER.map(el => {
            if (el.Point === currPERIndex) {
                stats.push(el.Stat);
            }
        })

        const merged = mergeObjects(stats);
        assembledDataRef.current = merged;

        // console.log(assembledDataRef.current, ' curr');
    }, [sortedData, currSTRIndex, currDEXIndex, currINTIndex, currPERIndex])

    useEffect(() => {
        currSTRIndexRef.current = currSTRIndex;
        currDEXIndexRef.current = currDEXIndex;
        currINTIndexRef.current = currINTIndex;
        currPERIndexRef.current = currPERIndex;
    }, [
        currSTRIndex,
        currDEXIndex,
        currINTIndex,
        currPERIndex
    ])

    const increment = (ref: React.MutableRefObject<number>, setFunc: any) => {
        // access the current state value
        if (ref.current + 1 < 100) {
          setFunc((oldCount: number) => oldCount + 1)
        }
        else {
            setFunc(0)
        }
      }
    
      const decrement = (ref: React.MutableRefObject<number>, setFunc: any) => {
        // access the current state value
        if (ref.current - 1 >= 0) {
          setFunc((oldCount: number) => oldCount - 1)
        }
      }

    const displayStats = () => {
        const data: any = [];
        Object.entries(assembledDataRef.current).forEach(([key, value]) => {
            console.log(key, typeof value);
            if (typeof value !== 'object') {
                console.log(key, value);
                
                data.push({[key]: value})
            }

            return <></>
            
        })
        
        return (
            <ul className='display__list'>
                {
                    data.map((entry: object) => {
                        return <li className='display__list-item'>{Object.keys(entry)} : {Object.values(entry)}</li>
                    })
                }
            </ul>
        ) 
        
    }

    return (
        <div className='combined-stats'>
            <div className="combined-stats__ui">
                <ul className="ui__list">
                    <li className="ui__list-item">
                        <h1 className="title">{titleSTR.current}</h1>
                        <div className="buttons-wrapper">
                            <Button btnStyle='square' title='-'onClick={() => decrement(currSTRIndexRef, setCurrSTRIndex)} />
                            <span className='current-stat'>{currSTRIndex}</span>
                            <Button btnStyle='square' title='+' onClick={() => increment(currSTRIndexRef, setCurrSTRIndex)} />
                        </div>
                    </li>
                    <li className="ui__list-item">
                        <h1 className="title">{titleDEX.current}</h1>
                        <div className="buttons-wrapper">
                            <Button btnStyle='square' title='-'onClick={() => decrement(currDEXIndexRef, setCurrDEXIndex)} />
                                <span className='current-stat'>{currDEXIndex}</span>
                            <Button btnStyle='square' title='+' onClick={() => increment(currDEXIndexRef, setCurrDEXIndex)} />
                        </div>
                    </li>
                    <li className="ui__list-item">
                        <h1 className="title">{titleINT.current}</h1>
                        <div className="buttons-wrapper">
                            <Button btnStyle='square' title='-'onClick={() => decrement(currINTIndexRef, setCurrINTIndex)} />
                                <span className='current-stat'>{currINTIndex}</span>
                            <Button btnStyle='square' title='+' onClick={() => increment(currINTIndexRef, setCurrINTIndex)} />
                        </div>
                    </li>
                    <li className="ui__list-item">
                        <h1 className="title">{titlePER.current}</h1>
                        <div className="buttons-wrapper">
                            <Button btnStyle='square' title='-'onClick={() => decrement(currPERIndexRef, setCurrPERIndex)} />
                                <span className='current-stat'>{currPERIndex}</span>
                            <Button btnStyle='square' title='+' onClick={() => increment(currPERIndexRef, setCurrPERIndex)} />
                        </div>
                    </li>
                </ul>
            </div>
            <div className="combined-stats__display">
                {displayStats()}
            </div>
        </div>
    )
}

export default CombinedStats

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