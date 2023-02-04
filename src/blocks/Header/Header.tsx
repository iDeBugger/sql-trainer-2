import { Key, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Item } from "react-stately";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { HeartOutlineIcon } from "../../assets/icons/HeartOutlineIcon";
import { LogoIcon } from "../../assets/icons/LogoIcon";
import { LogoText } from "../../assets/icons/LogoText";
import { MoonIcon } from "../../assets/icons/MoonIcon";
import { MoreHorizontalIcon } from "../../assets/icons/MoreHorizontalIcon";
import { SunIcon } from "../../assets/icons/SunIcon";
import { Button } from "../../components/Button/Button";
import { Dialog } from "../../components/Dialog/Dialog";
import { ModalButton } from "../../components/ModalButton/ModalButton";
import { Select } from "../../components/Select/Select";
import { LanguageType, ThemeType } from "../../store/reducers/settingsReducer";

interface LayoutProps {
  children: ReactNode;
}

interface RowProps {
  children: ReactNode;
  className?: string;
}

interface LogoRowProps {
  children: ReactNode;
  className?: string;
}

interface LanguageSelectProps {
  selectedLanguage: LanguageType;
  onSelect: (new_lang: LanguageType) => void;
}

interface ThemeButtonProps {
  selectedTheme: ThemeType;
  onClick: () => void;
}

interface SupportUsButtonProps {
  onClick: () => void;
  fill?: Parameters<typeof Button>[0]["fill"];
}

export interface HeaderProps {
  selectedLanguage: LanguageType;
  onLanguageSelect: (new_lang: LanguageType) => void;
  selectedTheme: ThemeType;
  onThemeButtonClick: () => void;
  onSupportMeClick: () => void;
}

const LANGUAGES: { title: string; value: LanguageType }[] = [
  {
    title: "english",
    value: "en",
  },
  {
    title: "russian",
    value: "ru",
  },
];

function Layout({ children }: LayoutProps) {
  return <div className="w-full px-6 py-2 flex flex-col">{children}</div>;
}

function Row({ children, className = "" }: RowProps) {
  return (
    <div className={`w-full py-2 flex flex-row justify-between ${className}`}>
      {children}
    </div>
  );
}

function LogoRow({ children, className = "" }: LogoRowProps) {
  return (
    <Row className={className}>
      <div className="flex flex-row gap-2 justify-start items-center">
        <LogoIcon className="w-10 h-10 flex-shrink-0" />
        <LogoText className="w-[126px] h-[40px] flex-shrink-0 text-gray-900 dark:text-gray-50" />
      </div>
      {children}
    </Row>
  );
}

function LanguageSelect({
  selectedLanguage,
  onSelect: onLanguageSelect,
}: LanguageSelectProps) {
  const { t } = useTranslation();

  const languageItems = LANGUAGES.map(({ title, value }) => (
    <Item key={value}>{t(title)}</Item>
  ));

  return (
    <Select
      name="language"
      label=""
      aria-label="Language select"
      selectedKey={selectedLanguage}
      onSelectionChange={(selectedKey: Key) =>
        onLanguageSelect(selectedKey as LanguageType)
      }
    >
      {languageItems}
    </Select>
  );
}

function ThemeToggler({ selectedTheme, onClick }: ThemeButtonProps) {
  const { t } = useTranslation();

  const isDarkTheme =
    selectedTheme === "dark" ||
    (selectedTheme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <Button
      leftIcon={isDarkTheme ? <MoonIcon /> : <SunIcon />}
      variant="secondary"
      size="medium"
      aria-label={t("toggle_color_scheme") || undefined}
      onPress={onClick}
    />
  );
}

function SupportMeButton({ onClick, fill }: SupportUsButtonProps) {
  const { t } = useTranslation();

  return (
    <Button
      leftIcon={<HeartOutlineIcon />}
      variant="primary"
      size="medium"
      fill={fill}
      onPress={onClick}
    >
      {t("support_me")}
    </Button>
  );
}

export function Header(props: HeaderProps) {
  const { t } = useTranslation();

  const {
    selectedLanguage,
    onLanguageSelect,
    selectedTheme,
    onThemeButtonClick,
    onSupportMeClick,
  } = props;

  return (
    <Layout>
      <LogoRow className="sm:hidden">
        <ModalButton
          buttonProps={{
            leftIcon: <MoreHorizontalIcon />,
            variant: "tertiary",
            size: "medium",
            "aria-label": t("open_main_menu") || undefined,
          }}
          isDismissable
          position="topFullWidth"
        >
          {(onCloseClick) => (
            <Dialog>
              <Layout>
                <LogoRow>
                  <Button
                    variant="tertiary"
                    onPress={onCloseClick}
                    leftIcon={<CloseIcon />}
                  />
                </LogoRow>
                <Row>
                  <LanguageSelect
                    selectedLanguage={selectedLanguage}
                    onSelect={onLanguageSelect}
                  />
                  <ThemeToggler
                    selectedTheme={selectedTheme}
                    onClick={onThemeButtonClick}
                  />
                </Row>
                <Row>
                  <SupportMeButton
                    fill="fillContainer"
                    onClick={onSupportMeClick}
                  />
                </Row>
              </Layout>
            </Dialog>
          )}
        </ModalButton>
      </LogoRow>
      <LogoRow className="hidden sm:max-md:flex">
        <div className="flex flex-row gap-3">
          <SupportMeButton onClick={onSupportMeClick} />
          <ModalButton
            buttonProps={{
              leftIcon: <MoreHorizontalIcon />,
              variant: "tertiary",
              size: "medium",
              "aria-label": t("open_main_menu") || undefined,
            }}
            isDismissable
            position="topFullWidth"
          >
            {(onCloseClick) => (
              <Dialog>
                <Layout>
                  <LogoRow>
                    <div className="flex flex-row gap-3">
                      <SupportMeButton onClick={onSupportMeClick} />
                      <Button
                        variant="tertiary"
                        onPress={onCloseClick}
                        leftIcon={<CloseIcon />}
                      />
                    </div>
                  </LogoRow>
                  <Row>
                    <LanguageSelect
                      selectedLanguage={selectedLanguage}
                      onSelect={onLanguageSelect}
                    />
                    <ThemeToggler
                      selectedTheme={selectedTheme}
                      onClick={onThemeButtonClick}
                    />
                  </Row>
                </Layout>
              </Dialog>
            )}
          </ModalButton>
        </div>
      </LogoRow>
      <LogoRow className="hidden md:flex">
        <div className="flex flex-row gap-3">
          <LanguageSelect
            selectedLanguage={selectedLanguage}
            onSelect={onLanguageSelect}
          />
          <ThemeToggler
            selectedTheme={selectedTheme}
            onClick={onThemeButtonClick}
          />
          <SupportMeButton onClick={onSupportMeClick} />
        </div>
      </LogoRow>
    </Layout>
  );
}
