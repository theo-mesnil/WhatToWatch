import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Linking } from 'react-native';

import { Box } from 'components/Box';
import { EmailIcon, SmileIcon, StarFillIcon } from 'components/Icon';
import { LOCALE_AUTO, LOCALE_EN, LOCALE_FR } from 'constants/locales';
import { useHeaderHeights } from 'constants/statusBar';
import { useLocale } from 'contexts/locales';
import { BasicLayout } from 'layouts/Basic';

import { Item } from './Item';

export function MoreScreen() {
  const { localeEntry, setLocaleEntry } = useLocale();
  const { headerHeight } = useHeaderHeights();

  function setEnglishLocale() {
    setLocaleEntry(LOCALE_EN);
  }

  function setFrenchLocale() {
    setLocaleEntry(LOCALE_FR);
  }

  function setAutoLocale() {
    setLocaleEntry(LOCALE_AUTO);
  }

  function sendMail() {
    Linking.openURL('mailto:mesniltheo+whattowatch@gmail.com');
  }

  function openMyWebsite() {
    Linking.openURL('https://www.theomesnil.com');
  }

  return (
    <BasicLayout>
      <Box pt={headerHeight}>
        <Item
          items={[
            {
              isCheckable: true,
              name: <FormattedMessage id="more.languages.auto" />,
              onPress: setAutoLocale,
              isChecked: localeEntry === LOCALE_AUTO,
              key: 'language_auto'
            },
            {
              isCheckable: true,
              name: <FormattedMessage id="more.languages.en" />,
              onPress: setEnglishLocale,
              isChecked: localeEntry === LOCALE_EN,
              key: 'language_en'
            },
            {
              isCheckable: true,
              name: <FormattedMessage id="more.languages.fr" />,
              onPress: setFrenchLocale,
              isChecked: localeEntry === LOCALE_FR,
              key: 'language_fr'
            }
          ]}
          title={<FormattedMessage id="more.languages.title" />}
        />
        <Item
          mt="lg"
          items={[
            {
              name: <FormattedMessage id="more.author.me.title" />,
              description: <FormattedMessage id="more.author.me.description" />,
              key: 'author_me',
              icon: SmileIcon,
              onPress: openMyWebsite
            },
            {
              name: <FormattedMessage id="more.author.contactMe.title" />,
              description: (
                <FormattedMessage id="more.author.contactMe.description" />
              ),
              key: 'author_contact',
              icon: EmailIcon,
              onPress: sendMail
            }
          ]}
          title={<FormattedMessage id="more.author.title" />}
        />
        <Item
          mt="lg"
          items={[
            {
              name: <FormattedMessage id="more.sources.themoviedb.title" />,
              description: (
                <FormattedMessage id="more.sources.themoviedb.description" />
              ),
              key: 'themoviedb',
              icon: StarFillIcon
            },
            {
              name: <FormattedMessage id="more.sources.evaIcons.title" />,
              description: (
                <FormattedMessage id="more.sources.evaIcons.description" />
              ),
              key: 'eva_icons',
              icon: StarFillIcon
            },
            {
              name: <FormattedMessage id="more.sources.appIcon.title" />,
              description: (
                <FormattedMessage id="more.sources.appIcon.description" />
              ),
              key: 'app_icon',
              icon: StarFillIcon
            }
          ]}
          title={<FormattedMessage id="more.sources.title" />}
        />
      </Box>
    </BasicLayout>
  );
}
