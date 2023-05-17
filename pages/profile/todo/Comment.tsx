import React, { FC } from 'react';
import styled from 'styled-components';
import localStorageService from '@/services/localStorage.service';
import commentsService from '@/services/comments.service';
import { useRouter } from 'next/router';
import { CommentInfoType } from '@/types/commentInfo';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { fetchComments } from '@/store/commentsSlice';

const Wrapper = styled.div`
  display: flex;
  width: 80%;
  margin-bottom: 15px;
  padding: 10px;
  background: 0;
  border-bottom: 1px solid #0d686d;
`;

const ImageWrapper = styled.div`
  width: 75px;
  height: 65px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #06474a;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;
`;

const InfoUser = styled.div`
  display: flex;
  width: 100%;
`;

const TitleComment = styled.article`
  width: 100%;
  padding: 4px;
`;

const DeleteWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 5px;
`;

const Delete = styled.button`
  color: #ff0404;
  font-weight: 600;
  background: 0;
`;

interface Props {
  profileID: string | string[];
  comment: CommentInfoType;
}
const Comment: FC<Props> = ({ comment, profileID }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = localStorageService.getUserId();

  const handleDelete = async () => {
    await commentsService.delete(comment?._id);
    dispatch(fetchComments());
  };

  const rolesForDeleteComment = (): boolean => {
    if (userId === profileID || comment?.userId === userId) {
      return true;
    }
    return false;
  };

  const router = useRouter();
  return (
    <Wrapper>
      <ImageWrapper onClick={() => router.push(`/profile/${comment?.userId}`)}>
        {comment?.image && <Image src={comment?.image} alt="Profile Image"></Image>}
      </ImageWrapper>
      <ContentWrapper>
        <InfoUser>
          <p style={{ color: '#0D686D' }}>{comment?.userTag}</p>
          <p style={{ marginLeft: '20px', color: '#0D686D' }}>{comment?.date}</p>
          <p style={{ marginLeft: '20px', color: '#0D686D' }}>{comment?.time}</p>
        </InfoUser>
        <TitleComment>{comment?.title}</TitleComment>
        {rolesForDeleteComment() && (
          <DeleteWrapper>
            <Delete onClick={handleDelete}>Delete comment</Delete>
          </DeleteWrapper>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

export default Comment;
