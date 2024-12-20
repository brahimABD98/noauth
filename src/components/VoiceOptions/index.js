import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Button,
} from '@chakra-ui/react';
import { GoSettings } from 'react-icons/go';

function VoiceOptions({ synthesizeSpeech, handleAudioRemoval, modalBgColor }) {
  const [initialSpeakingRate, setInitialSpeakingRate] = useState(1);
  const [speakingRate, setSpeakingRate] = useState(1);
  const [speakingRateChanged, setSpeakingRateChanged] = useState(false);

  const [initialVoiceGender, setInitialVoiceGender] = useState('female');
  const [voiceGender, setVoiceGender] = useState('female');
  const [voiceGenderChanged, setVoiceGenderChanged] = useState(false);

  const [isBtnClicked, setIsBtnClicked] = useState(false);

  const handleMenuOpen = () => {
    if (isBtnClicked) {
      setInitialSpeakingRate(speakingRate);
      setInitialVoiceGender(voiceGender);
    }
  };

  const handleSpeakingRateChange = sr => {
    setSpeakingRate(sr);
    if (sr === initialSpeakingRate) {
      setSpeakingRateChanged(false);
    } else {
      setSpeakingRateChanged(true);
    }
  };

  const handleVoiceGenderChange = vg => {
    setVoiceGender(vg);
    if (vg === initialVoiceGender) {
      setVoiceGenderChanged(false);
    } else {
      setVoiceGenderChanged(true);
    }
  };

  const handleVoiceChanges = onClose => {
    onClose();

    setIsBtnClicked(true);
    setSpeakingRateChanged(false);
    setVoiceGenderChanged(false);
    handleAudioRemoval(false);
    synthesizeSpeech(speakingRate, voiceGender);
  };

  return (
    <Menu closeOnSelect={false} onOpen={handleMenuOpen}>
      {({ onClose }) => (
        <>
          <MenuButton
            ml={4}
            size='lg'
            as={IconButton}
            color={modalBgColor === '#111010' ? '#FFFFFF' : ''}
            variant='ghost'
          />
          <MenuList
            p={4}
            zIndex='999'
            minWidth={{ base: '240px', md: '300px' }}>
            <MenuGroup title='Voice Speed'>
              <Slider
                aria-label='Voice speed'
                colorScheme='twitter'
                defaultValue={1}
                min={0.25}
                max={2}
                step={0.25}
                value={speakingRate}
                onChange={handleSpeakingRateChange}>
                <SliderMark value={0.25} mt='2' fontSize='xs'>
                  0.25
                </SliderMark>
                <SliderMark value={1} mt='2' fontSize='xs'>
                  1
                </SliderMark>
                <SliderMark value={2} mt='2' fontSize='xs'>
                  2
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </MenuGroup>
            <MenuDivider my={6} />
            <MenuOptionGroup
              defaultValue='female'
              title='Voice Selection'
              type='radio'
              value={voiceGender}
              onChange={handleVoiceGenderChange}>
              <MenuItemOption value='female'>Female</MenuItemOption>
              <MenuItemOption value='male'>Male</MenuItemOption>
            </MenuOptionGroup>
            {(speakingRateChanged || voiceGenderChanged) && (
              <Button
                mt={4}
                size='sm'
                colorScheme='twitter'
                onClick={() => handleVoiceChanges(onClose)}>
                Save
              </Button>
            )}
          </MenuList>
        </>
      )}
    </Menu>
  );
}

export default VoiceOptions;
