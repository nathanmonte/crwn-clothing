import { useNavigate } from "react-router-dom";
import { DirectoryItemContainer, BackgroundImage, Body } from "./directory-item.styles";

const DirectoryItem = ({ id, imageUrl, title, route }) => {

  const navigate = useNavigate();

  return <DirectoryItemContainer key={id}>
    <BackgroundImage className="background-image" imageUrl={imageUrl}></BackgroundImage>
    <Body className="body" onClick={() => navigate(route)}>
      <h2>{title}</h2>
      <p>Shop now</p>
    </Body>
  </DirectoryItemContainer>
}

export default DirectoryItem;