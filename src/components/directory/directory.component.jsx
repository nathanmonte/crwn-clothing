import DirectoryItem from "../directory-item/directory-item.component";
import { DirectoryContainer } from "./directory.styles";

const Directory = ({ categories }) => {
  return <DirectoryContainer>
    {
      categories.map(({ title, id, imageUrl }) => (
        <DirectoryItem title={title} id={id} imageUrl={imageUrl} key={id} />
      ))
    }
  </DirectoryContainer>
}

export default Directory;