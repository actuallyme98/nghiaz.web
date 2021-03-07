import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

// styles
import css from './style.module.scss';

// components
import SubmitButton from '../../../../components/submit-button';
import InputField from '../../../../components/input-field';

// redux
import { RootState } from '../../../../redux/stores/configure-store';
import notification from 'antd/lib/notification';

interface Props {}

// mock
const loading = false;

const UpdateAvatar: React.FC<Props> = () => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const profile = useSelector((store: RootState) => store.appState.profile);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avarartFile, setAvatarFile] = useState<File>();
  const avatar = process.env.DEFAULT_AVATAR_URL || '';

  useEffect(() => {
    setAvatarUrl(avatar);
  }, [avatar]);

  const onChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.currentTarget;
    const files = element.files;
    if (files) {
      setAvatarUrl(URL.createObjectURL(files[0]));
      setAvatarFile(files[0]);
    }
  };

  const handleUploadAvatar = useCallback(async () => {
    if (avarartFile) {
      // upload
    }
  }, []);

  return (
    <div className={isMobile ? css.rootMobile : css.rootDesktop}>
      <div className={css.formField}>
        <InputField
          label="Ảnh đại diện"
          input={{ id: 'change-avatar', type: 'file', accept: 'image/*', onChange: onChangeAvatar }}
          classes={{ input: css.inputFieldInput }}
        />
        <label htmlFor="change-avatar">
          <img alt="avatar" className={css.preview} src={avatarUrl} />
        </label>
      </div>
      <SubmitButton
        disabled={!avatarUrl || avatarUrl === avatar}
        onClick={handleUploadAvatar}
        loading={loading}
        className={isMobile ? css.updateBtnMobile : css.updateBtn}
      >
        CẬP NHẬT AVATAR
      </SubmitButton>
    </div>
  );
};

export default UpdateAvatar;
