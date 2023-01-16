import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss";

const Directory = ({ categories }) => {
  return <div className="directory-container">
    {
      categories.map(({ title, id, imageUrl }) => (
        <DirectoryItem title={title} id={id} imageUrl={imageUrl} key={id} />
      ))
    }
  </div>
}

export default Directory;