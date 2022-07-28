export function ReadingListDropDown({
  readingListData,
  handleChange,
  readingListSelection,
}) {
  return (
    readingListData.length > 0 && (
      <select
        value={readingListSelection}
        onChange={(e) => {
          handleChange;
        }}
      >
        <option hidden value="">
          Please Select a list
        </option>
        {readingListData?.map((arr, index) => {
          return (
            <option key={index} value={arr.reading_list_name}>
              {arr.reading_list_name}
            </option>
          );
        })}
      </select>
    )
  );
}
