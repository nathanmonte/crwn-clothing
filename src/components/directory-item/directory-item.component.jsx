import { DirectoryItemContainer, BackgroundImage, Body, Title, ShopNow } from "./directory-item.styles";

const DirectoryItem = ({ id, imageUrl, title }) => {

  return <DirectoryItemContainer key={id}>
    <BackgroundImage className="background-image" style={{ backgroundImage: `url(${imageUrl})` }}></BackgroundImage>
    <Body className="body">
      <Title>{title}</Title>
      <ShopNow>Shop now</ShopNow>
    </Body>
  </DirectoryItemContainer>
}

export default DirectoryItem;