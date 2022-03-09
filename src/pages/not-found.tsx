import { Link } from 'react-router-dom';

export const NotFound404 = () => {
return (
    <>
        <h1>404 - Страница не найдена!</h1>
        <Link className="text text_type_main-default text_color_inactive" to="/">Конструктор &gt;&gt;</Link>
    </>
)
}