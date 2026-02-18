import { useParams } from "react-router-dom";

export default function Recommendation() {
    const { id } = useParams();
    return <h1>Recommendation for: {id}</h1>;
};
