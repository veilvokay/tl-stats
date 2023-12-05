import { FC, useEffect, useRef, useState } from "react";
import { IStatsData } from "../bff/fetch-stats";
import { getDeepKeys, trimStatName } from "../helpers/helpers";
import './ChangeStat.sass';
import Button from "./layout/Button";

type ChangeStatProps = {
  specificStat: IStatsData[],
}

const ChangeStat: FC<ChangeStatProps> = ({specificStat}) => { 
  const [statTitle, setStatTitle] = useState<string>('');
  const [currStatIndex, setCurrStatIndex] = useState(0);
  const currentStatIndexRef = useRef(1);
  const [keys, setKeys] = useState<string[]>();
  const [keyValuePairs, setKeyValuePairs] = useState<{}>({});
  const [attackPairs, setAttackPairs] = useState<{}>({});
  const [bonusAttackPairs, setBonusAttackPairs] = useState<{}>({});

  useEffect(() => {
    console.log(specificStat); 
    if (!statTitle) {
      const trim = trimStatName(specificStat[0].Type);
      setStatTitle(trim)
    }
  }, [statTitle, specificStat])

  useEffect(() => {
    if (!keys) {
      const getKeys = getDeepKeys(specificStat[0].Stat);
      const cleanKeys: string[] = [];
      getKeys.forEach(key => {
        if (key.includes('.') || key === 'AttackPowers' || key === 'BonusAttackPowers') {
          // do nothing
        } else {
          cleanKeys.push(key);
        }
      })
      setKeys(cleanKeys);
    }
  }, [specificStat, keys])

  useEffect(() => {
    // cache the current state value
    currentStatIndexRef.current = currStatIndex;
    let attackPowers = {}
    let bonusAttackPowers = {}
    let pairs = {}

    // get AttackPowers
    // @ts-ignore
    for (const [key, value] of Object.entries(specificStat[currStatIndex].Stat?.AttackPowers)) {
      // @ts-ignore
      attackPowers[key] = value;
    }
    setAttackPairs(attackPowers);
    // get BonusAttackPowers
    // @ts-ignore
    for (const [key, value] of Object.entries(specificStat[currStatIndex].Stat?.BonusAttackPowers)) {
      // @ts-ignore
      bonusAttackPowers[key] = value;
    }
    setBonusAttackPairs(bonusAttackPowers);
    
    // get Rest
    keys?.forEach(key => {
      // @ts-ignore
      pairs[key] = specificStat[currStatIndex].Stat[key];
    })
    setKeyValuePairs(pairs);
    
    console.log(attackPairs, 'atk');
    console.log(bonusAttackPairs, 'Batk');
    
    console.log(keyValuePairs, 'pairs');
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currStatIndex]);

  const increment = () => {
    // access the current state value
    if (currentStatIndexRef.current + 1 < 100) {
      setCurrStatIndex((oldCount) => oldCount + 1)
    }
    else {
      setCurrStatIndex(0)
    }
  }

  const decrement = () => {
    // access the current state value
    if (currentStatIndexRef.current - 1 >= 0) {
      setCurrStatIndex((oldCount) => oldCount - 1)
    }
  }
  
  return (
    <div className="change-stat__wrapper">
      <h1 className="title">{statTitle}</h1>
      <p className="current-stat">{currStatIndex + 1}</p>
      <div className="button-group">
        <Button onClick={decrement} title="-" btnStyle='square' />
        <Button onClick={increment} title="+" btnStyle='square' />
      </div>
      <ul className="list atk-powers" style={{listStyle: 'none'}}>
        {Object.entries(attackPairs).map(([key, value], i) => (
          <>
            {/* @ts-ignore */}
            <li className="list-item">{key} {value}</li>
          </>
        ))}
      </ul>
      <ul className="list b-atk-powers" style={{listStyle: 'none'}}>
        {Object.entries(bonusAttackPairs).map(([key, value], i) => (
          <>
            {/* @ts-ignore */}
            <li className="list-item">{key} {value}</li>
          </>
        ))}
      </ul>
      <ul className="list powers" style={{listStyle: 'none'}}>
        {Object.entries(keyValuePairs).map(([key, value], i) => (
          <>
            {/* @ts-ignore */}
            <li className="list-item">{key} {value}</li>
          </>
        ))}
      </ul>
    </div>
  )
}

export default ChangeStat