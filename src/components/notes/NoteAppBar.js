import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { starSaveNote, startUploading } from '../../actions/notes'

export const NoteAppBar = () => {
  const dispatch = useDispatch()
  const {active} = useSelector(state => state.note)
  const handleSave = ()=>{
      dispatch(starSaveNote(active))
  }
  const handleClickPicture = ()=>{

    document.querySelector('#fileSelector').click();
  }
  const handleFileChange = (e)=>{
    const file = e.target.files[0]
    if (file){
      dispatch(startUploading(file));
    }
  }
  return (
    <div className="note__appbar">
        <span>26 de abril 2021</span>
        <input
        id='fileSelector'
        type='file'
        style={{display: 'none' }}
        onChange={handleFileChange}
        name='file'
        />
        <div>
            <button 
            onClick={handleClickPicture}
            className="btn">
                Picture
            </button>
            <button 
            onClick={handleSave}
            className="btn">
                Save
            </button>
        </div>

    </div>
  )
}
