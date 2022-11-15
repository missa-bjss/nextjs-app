import { union, without } from 'lodash';
import React, { useState } from 'react';
import { IoFilterOutline } from 'react-icons/io5';
import { UIStore } from '../../store/appState';
import PopUpMenu, { PopUpMenuItem } from '../atoms/PopUpMenu';
import TagButton from '../atoms/TagButton';
import IconButton from '../quarks/IconButton';

const ALL_INDUSTRIES: PopUpMenuItem[] = [
    { title: 'Hospitality', value: 'hospitality' },
    { title: 'Retail', value: 'retail' },
    { title: 'Deliveries', value: 'deliveries' },
    { title: 'Cleaning', value: 'cleaning' },
    { title: 'Home Improvement', value: 'home-improvement' },
  ]
  
  const INDUSTRY_TITLE_LOOKUP: { [key: string]: string } = Object.fromEntries(
    new Map(ALL_INDUSTRIES.map((item) => [item.value, item.title]))
  )
  
  function buildIndustryList(selectedIndustries: string[] | undefined) {
    if (!selectedIndustries || selectedIndustries.length == 0) {
      return ALL_INDUSTRIES
    }
  
    return ALL_INDUSTRIES.filter(
      (i) => !selectedIndustries.includes(i.value || '')
    )
  }

const GigsFilter = () => {
    const [filterVisible, setFilterVisible] = useState(false)
    const selectedIndustries = UIStore.useState( s => s.selectedIndustries );
    const availableIndustries = buildIndustryList(selectedIndustries)
    const shouldShowFilterOptions = !selectedIndustries || selectedIndustries.length < 3

    function setSelectedIndustries(items: any){
      console.log ( "selectedIndustries", selectedIndustries )
      setFilterVisible(false)
      UIStore.update( s =>{
        s.selectedIndustries = items
      })
    }

    function addSelectedIndustry( item: string | undefined ){
      setFilterVisible(false)
      item && UIStore.update( s =>{
        s.selectedIndustries = [...selectedIndustries, item]
      })
    }

    return (
        <>
            {availableIndustries.length > 0 && shouldShowFilterOptions && (
            <>
                <IconButton onClick={() => setFilterVisible(!filterVisible)}>
                   <IoFilterOutline />
                </IconButton>
                {filterVisible && (
                <PopUpMenu
                    prompt="Select an industry"
                    items={availableIndustries}
                    onSelect={(item) => addSelectedIndustry(item)}
                />
                )}
            </>
        )}

        {(selectedIndustries || []).map((i) => (
          <TagButton
            key={i}
            value={i}
            title={INDUSTRY_TITLE_LOOKUP[i] || 'Unknown'}
            onDelete={(v) => {
              if (v) {
                setSelectedIndustries(without(selectedIndustries, v))
                setFilterVisible(false)
              }
            }}
          />
        ))}
        </>
    );
};

export default GigsFilter;