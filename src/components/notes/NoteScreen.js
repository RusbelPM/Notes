import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote, startDelete } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NoteAppBar } from "./NoteAppBar";

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.note);
  const [formValues, inputChange, reset] = useForm(note);
  const { title, body, id } = formValues;
  const activeID = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeID.current) {
      reset(note);
      activeID.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handleDelete = () => {
    dispatch(startDelete(id));
  };

  return (
    <div className="notes__main-content">
      <NoteAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some Awesome Title"
          className="notes__title-input"
          value={title}
          onChange={inputChange}
          name="title"
        />
        <textarea
          placeholder="What Happened Today"
          className="notes__textarea"
          value={body}
          onChange={inputChange}
          name="body"
        ></textarea>
        {note.url && (
          <div className="notes__image">
            <img src={note.url} alt="imagen" />
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Borrar
      </button>
    </div>
  );
};
