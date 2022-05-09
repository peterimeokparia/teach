const PointsDistribution = ({ element, name, value, handlePointsPerQuestion, handlePointsPerQuestionParam }) => {
 return <>
    <input
        id={element?.id}
        type={"number"}
        name={name}
        value={ element?.questionPoints }
        onChange={ ( event ) => handlePointsPerQuestion(event, handlePointsPerQuestionParam) }
    />
 </>;
};

export default PointsDistribution;