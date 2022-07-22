const Note = ({ note, toggleImportance }) => {
  const label = note.toggleImportance;
  return (
    <>
      <li>{note.content}</li>
      <button onClick={toggleImportance}>show import{label}</button>
    </>
  );
};
export default Note;
