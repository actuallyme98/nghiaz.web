import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

// styles
import css from './style.module.scss';

// components
import SubmitButton from '../../../../components/submit-button';
import InputField from '../../../../components/input-field';
import notification from 'antd/lib/notification';

// redux
import * as AppActions from '@actions/app-action';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/stores/configure-store';

interface Props {}

// mock
const loading = false;

const UpdateAvatar: React.FC<Props> = () => {
  const isMobile = useSelector((store: RootState) => store.appState.isMobile);
  const profile = useSelector((store: RootState) => store.appState.profile);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File>();
  const avatar = process.env.DEFAULT_AVATAR_URL || '';
  const dispatch = useDispatch();

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
    const whiteList = ['image/jpeg', 'image/png'];
    if (!avatarFile || !whiteList.includes(avatarFile.type)) {
      notification.error({
        message: 'INVALID FILE',
        placement: 'bottomRight',
      });
      return;
    }
    const formData = new FormData();
    formData.append('avatar', avatarFile, avatarFile.name);
    try {
      await dispatch(AppActions.updateAvatarAction(formData));
      notification.success({
        message: 'Cập nhật thông tin thành công',
        placement: 'bottomRight',
      });
    } catch (err) {
      notification.error({
        message: String(err).replace(/Error: /g, ''),
        placement: 'bottomRight',
      });
    }
  }, [avatarFile]);

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
