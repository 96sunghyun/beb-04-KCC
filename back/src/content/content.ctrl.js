exports.write = (req, res) => {
  const { title, description } = req.data;
  // title과 description을 가지고 새로운 게시물을 저장하는 함수
};

exports.read = (req, res) => {
  const { contentId } = req.params;
  res.send(contentId);
  // contentId를 가지고 해당하는 컨텐츠의 detail을 return하는 함수
};

exports.remove = (req, res) => {
  const { contentId } = req.params;
  // contentId를 가지고 해당하는 컨텐츠를 delete 하는 함수
};

exports.update = (req, res) => {
  const { contentId } = req.params;
  const { title, description } = req.data;
  // contentId와 입력받은 title, desc를 이용해서 db에 있는 컨텐츠를 업데이트하는 함수
};
