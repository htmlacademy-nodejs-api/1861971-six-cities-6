type Body = {
  comment: string,
  rating: number
}

type BodyToServer = {
  text: string,
  rating: number
}

export const adapterCommentToServer = (body: Body): BodyToServer => {
type ChengeBody = Omit<Body & BodyToServer, 'comment'> & {comment?: string};

const chengeBody: ChengeBody = {
  ...body,
  text:  body.comment
};

delete chengeBody.comment;

return chengeBody;
};
