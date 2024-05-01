import React from "react";
import { Link } from "react-router-dom";

let getTime = (noteLoop) => {
  return new Date(noteLoop.updated).toLocaleDateString();
};

let getTitle = (noteLoop) => {
  //spit by new lines and just get the first line
  //split will make a list of each line and will only pull on the first line by index zero
  const title = noteLoop.body.split("\n")[0];
  if (title.length > 45) {
    return title.slice(0, 45);
  }
  return title;
};

let getContent = (noteLoop) => {
  //Get content after title
  let title = getTitle(noteLoop);
  let content = noteLoop.body.replaceAll("\n", "");
  content = content.replaceAll(title, "");

  //Slice content and add three dots in over 45 characters to show there is more
  if (content.length > 45) {
    return content.slice(0, 45) + "...";
  } else {
    return content;
  }
};
const ListItems = ({ noteLoop }) => {
  return (
    <Link to={`/note/${noteLoop.id}`}>
      <h3>{getTitle(noteLoop)}</h3>
      <p>
        <span>{getTime(noteLoop)}</span>
        {getContent(noteLoop)}
      </p>
    </Link>
  );
};

export default ListItems;
