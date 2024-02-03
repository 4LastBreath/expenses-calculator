import React from 'react';
import { dataLanguages  } from '../languages/dataLanguages';
import { useLanguage } from '../languages/LanguageContext';
import { Item } from './main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface ButtonsContainerProps {
  handleAddInput: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteSelected: () => void;
  calculateRemainingAmount: () => number;
  addInputValue: string;
  setAddInputValue: React.Dispatch<React.SetStateAction<string>>;
  showError: boolean;
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleResetCheckbox: (e: React.MouseEvent<HTMLButtonElement>) => void;
  data: Item[];
  money: string;
  result: number;
}

const ButtonsContainer: React.FC<ButtonsContainerProps> = ({handleAddInput, handleDeleteSelected, calculateRemainingAmount, setAddInputValue, addInputValue, showError, setShowError, setShowModal, handleResetCheckbox, data, result, money}) => {

  const {language} = useLanguage();
  const translatedData = dataLanguages[language];

  const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddInputValue(e.target.value)
    setShowError(false)
  }

  const handleShowModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowModal(true)
  }

  const isInputChecked = data.some((item) => item.checked);

  return (
    <div className='bottom'>
      <form action="" className="form-add flex gap-50 mx-auto" onSubmit={handleAddInput}>
          <div className="add-input_container relative">
              <input type="text" className="input" placeholder={translatedData.addFieldPlaceholder} maxLength={20} value={addInputValue} onChange={handleAddInputChange} />
              {showError && <div className='error-message'>{translatedData.error}</div>}
          </div>
          <button className="button add-button" type="submit">
              <FontAwesomeIcon icon={faPlus}/>
          </button>
      </form>

      <div className='mx-auto flex gap-50'>
      <button className="button" onClick={calculateRemainingAmount}>{translatedData.calculate}</button>
      <button className="button" onClick={handleShowModal}>{translatedData.exportPDF}</button>

      {isInputChecked && 
            <div className='button-delete-cancel_container flex gap-50'>
              <button className="button delete"onClick={handleDeleteSelected}>{translatedData.delete}</button>
              <button className='button cancel' onClick={handleResetCheckbox}>{translatedData.cancel}</button>
            </div>
      }
      </div>

      <div className="result">{result}{money}</div>
  </div>
  );
};

export default ButtonsContainer;