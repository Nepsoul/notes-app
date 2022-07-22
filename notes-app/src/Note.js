const Note = ({ note, toggleImportance }) => {
  const label = note.toggleImportance;
  return (
    <>
      <li>{note.content}</li>
      <button onClick={toggleImportance}>show important{label}</button>
    </>
  );
};
export default Note;
