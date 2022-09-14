const Note = ({ note, toggleImportance }) => {
  const label = note.toggleImportance;
  return (
    <>
      <li>
        {note.content} ({note.important.toString()}){" "}
        <button onClick={toggleImportance}>show important{label}</button>
      </li>
    </>
  );
};
export default Note;
