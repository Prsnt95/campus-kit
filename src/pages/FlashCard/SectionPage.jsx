import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import { Card, TextField } from "@mui/material";

const SectionPage = () => {
  const { section, id } = useParams();
  return (
    <div className="sectionPage--wrapper">
      <div className="sectionPage--header">
        <Link to={`/Flashcard`}>
          <ReplyRoundedIcon></ReplyRoundedIcon>
          <p>Flashcards</p>
        </Link>

        <h1>{section}</h1>
        <p>Card ID: {id}</p>
      </div>
      <Card className="sectionPage--flashcard">Hi</Card>
      <div className="sectionPage--addCards">
        <TextField placeholder="Question"></TextField>
        <TextField placeholder="Answer"></TextField>
      </div>
    </div>
  );
};

export default SectionPage;
