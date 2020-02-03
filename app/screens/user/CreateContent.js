import React, { useState } from 'react';
import {
    TextInput,
    TextArea,
    Form,
    ThemedView,
    PickerInput, Heading, CellViewSwitch, TagPicker,
} from '../../components';
import { useSelector } from "react-redux";
import { getAppTheme } from "../../redux/reducers";
import { View } from 'react-native';

const CreateContentScreen = ({ navigation }) => {
    const theme = useSelector(state => getAppTheme(state));
    const user = useSelector(state => state.authentication.user);

    const types = [
        { label: 'Телеканал', value: 10 },
        { label: 'Кино и фильмы', value: 20 },
    ];

    const categories = [

    ];

    const [ inMain, setInMain ] = useState(false);
    const [ name, setName ] = useState(null);
    const [ url, setUrl ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState(null);
    const [ desc, setDesc ] = useState(null);
    const [ adUrl, setAdUrl ] = useState(null);
    const [ type, setType ] = useState(null);
    const [ category, setCategory ] = useState(null);
    const [ pinned, setPinned ] = useState(null);

    const [ success, setSuccess ] = useState({
        has: false,
        text: 'Unexpected text'
    });

    const [ error, setError ] = useState({
        has: false,
        error: "Unexpected error",
        attributes: []
    });

    const handleFormSubmit = async () => {

    };

    return (
        <ThemedView>
            <Form
                onSubmit={handleFormSubmit}
                header={'Создание нового контента'}
                buttonTitle={'Давай, давай. создавай быстрее!'}
                headerColor={theme.primaryColor}
                hasError={error.has}
                hasSuccess={success.has}
                flashText={error.has ? error.error : (success.has ? success.text : '')}
            >
                <TextInput
                    description={'Решать Вам, как люди будут видеть Ваш контент, больше некому.'}
                    value={name}
                    onChangeText={(field) => setName(field)}
                    customErrors={error.attributes}
                    placeholder={'Введите наименование'}
                    label={'Наименование'}
                    inputname={'name'}
                />
                <TextInput
                    description={'Плиз, ставьте сюда ссылку непосредственно на само вещание или поток или видео файл!'}
                    value={url}
                    onChangeText={(field) => setUrl(field)}
                    customErrors={error.attributes}
                    placeholder={'Введите ссылку на контент'}
                    label={'Ссылка (url)'}
                    inputname={'url'}
                />
                <TextInput
                    description={'Да, да, да, пока что нет возможности загружать картинки на сервер, поймите и простите, мы исправимся!'}
                    value={imageUrl}
                    onChangeText={(field) => setImageUrl(field)}
                    customErrors={error.attributes}
                    placeholder={'Введите ссылку на картинку'}
                    label={'Ссылка на картинку (url)'}
                    inputname={'image'}
                />
                <TextInput
                    description={'Вааах'}
                    value={adUrl}
                    onChangeText={(field) => setAdUrl(field)}
                    customErrors={error.attributes}
                    placeholder={'Введите ссылку на рекламу VPAID, VAST'}
                    label={'Ууу вкусняшки пошли! Ссылка на рекламу (url)'}
                    inputname={'ad_url'}
                />
                <TagPicker
                    onSelect={(items) => {
                        console.log(items);
                    }}
                    label={'Тип'}
                    multiple
                    tags={[
                        {
                            id: 10,
                            title: 'Телеканал',
                            description: 'Выберите данный тип контента, если он является, как ни странно, телеканалом :)'
                        },
                        {
                            id: 20,
                            title: 'Кино и фильмы',
                            description: 'В данный тип контента входит пратически все: Фильмы, сериалы, анимационные фильмы и т.д.'
                        },
                        {
                            id: 30,
                            title: 'VR контент',
                            description: 'Вы сможете погрузиться в дополненную реальность прямо в вашем телефоне!',
                            disabled: true
                        },
                    ]}
                />
                {/*<PickerInput
                    label={'Тип'}
                    customErrors={error.attributes}
                    inputname={'type'}
                    items={types}
                    selectedValue={type}
                    onSelect={(t) => setType(t)}
                />*/}
                <TextArea
                    lineNumbers={10}
                    value={desc}
                    onChangeText={(field) => setDesc(field)}
                    customErrors={error.attributes}
                    placeholder={'Напишите что-нибудь, пожалуйста...'}
                    label={'Описание'}
                    inputname={'desc'}
                />
                <TagPicker
                    onSelect={(items) => {
                        console.log(items);
                    }}
                    label={'Категория'}
                    multiple={false}
                    tags={[
                        {
                            id: 10,
                            title: 'Кино и фильмы',
                            description: 'Конент для настоящих киноманов! Про сериалы тоже не забываем.'
                        },
                        {
                            id: 20,
                            title: 'Позновательное',
                            description: 'Будет интересно как детям, так и взрослым.'
                        },
                        {
                            id: 30,
                            title: 'Новостные',
                            description: 'Ооо! Серьезный контент подкатил. Обходим, обходим стороной!',
                        },
                        {
                            id: 40,
                            title: 'Спортивные',
                            description: 'Все мы любим мяч погонять или хотя бы посмотреть на это))',
                        },
                        {
                            id: 50,
                            title: 'Детские',
                            description: 'Тут все сказано, контент для самых маленьких.',
                        },
                        {
                            id: 60,
                            title: 'Хобби',
                            description: 'Друзья и зрители наверняка оценят ваши старания!',
                        },
                        {
                            id: 70,
                            title: 'Развлекательное',
                            description: 'Ну тут самый сок, гоу развлечемся.',
                        },
                        {
                            id: 80,
                            title: 'Музыкальные',
                            description: 'Все мы в душе меломаны, просто не знаем этого...',
                        },
                        {
                            id: 90,
                            title: 'Общие',
                            description: 'Вы долистали до сюда? Ну у вас и выдержка! Не знаете что бырать - выбирайте общие!',
                        },
                    ]}
                />
                <Heading styles={{ paddingLeft: 0, justifyContent: 'center' }} color={theme.primaryColor} text={'Ой сколько галочек, без паники!'} />
                <Heading
                    styles={{ paddingLeft: 0, paddingBottom: 5 }}
                    color={theme.primaryColor}
                    text={'Добавить на главную?'}
                    description={'Не радуйся так легко туда попасть! Для начала ты должен стать оффициальным представителеем, а потмо уже посмотрим на Твое поведени ^_^'}
                />
                <View style={{ alignItems: 'flex-start' }}>
                    <CellViewSwitch disabled={user.is_official !== 1} onValueChange={(status) => setInMain(status)} value={inMain} />
                </View>
                <Heading
                    styles={{ paddingLeft: 0, paddingBottom: 5 }}
                    color={theme.primaryColor}
                    text={'Закрепить на Вашей стене?'}
                    description={'Его можно будет найти сразу на стене, ссамый вверх скролящиеся квадратики, видно? Хорошо. Пользователи первым делом увидят этот контент.'}
                />
                <View style={{ alignItems: 'flex-start' }}>
                    <CellViewSwitch disabled={false} onValueChange={(status) => setPinned(status)} value={pinned} />
                </View>
                <Heading styles={{ paddingLeft: 0 }} color={theme.primaryColor} text={'Сразу в архив, серьезно?'} />
                <View style={{ alignItems: 'flex-start' }}>
                    <CellViewSwitch disabled={false} onValueChange={(status) => setPinned(status)} value={pinned} />
                </View>
                <Heading
                    styles={{ paddingLeft: 0, paddingBottom: 5 }}
                    color={theme.primaryColor}
                    text={'Активно или нет, атвечай!?'}
                    description={'Если Вы решите не активировать, то данный контент не будет виден пользователям.'}
                />
                <View style={{ alignItems: 'flex-start' }}>
                    <CellViewSwitch disabled={false} onValueChange={(status) => setPinned(status)} value={pinned} />
                </View>
                <Heading
                    styles={{ paddingLeft: 0, paddingBottom: 5 }}
                    color={theme.primaryColor} text={'Использовать свой плеер?'}
                    description={'Что это и с чем его есть? Понимаю. Крч есть возможность добавить полностью свой плеер и включть его, тогда всегда будет отображаться Ваш плеер не зависимо от выбора пользователя.'}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        inputStyles={{ flex: 1, marginRight: 10 }}
                        value={adUrl}
                        onChangeText={(field) => setAdUrl(field)}
                        customErrors={error.attributes}
                        placeholder={'Введите ссылку на свой плеер'}
                        inputname={'own_player_url'}
                    />
                    <View style={{ alignItems: 'flex-start' }}>
                        <CellViewSwitch disabled={false} onValueChange={(status) => setPinned(status)} value={pinned} />
                    </View>
                </View>
                <Heading
                    styles={{ paddingLeft: 0, paddingBottom: 5 }}
                    color={theme.primaryColor}
                    text={'Контент для лиц старше 18 лет'}
                    description={'Пожалуйста, соблюдайте правила размещения контента.'}
                />
                <View style={{ alignItems: 'flex-start' }}>
                    <CellViewSwitch disabled={false} onValueChange={(status) => setPinned(status)} value={pinned} />
                </View>
                <Heading
                    styles={{ paddingLeft: 0, paddingBottom: 5 }}
                    color={theme.primaryColor} text={'Минутка принятия решений'}
                    description={'Нажимая на кнопку создания контента "Давай, давай. создавай быстрее!" Вы соглашаетесь с правилами публикациями контента и сервиса. Данную информацию можно легко найти в меню.'}
                />
            </Form>
        </ThemedView>
    );
};

export default CreateContentScreen;