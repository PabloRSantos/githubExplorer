import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { Container, Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
    repository: string;
}

const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();

    return (
        <Container>
            <Header>
                <img src={logoImg} alt="Github Explorer" />
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>

            <RepositoryInfo>
                <header>
                    <img src="" alt="" />
                    <div>
                        <strong>Rocketseat</strong>
                        <p>Descrição</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>1321</strong>
                        <span>Starts</span>
                    </li>

                    <li>
                        <strong>1321</strong>
                        <span>Forks</span>
                    </li>

                    <li>
                        <strong>1321</strong>
                        <span>Issues abertas</span>
                    </li>
                </ul>
            </RepositoryInfo>

            <Issues>
                <Link to="/repository/">
                    <div>
                        <strong>repository.full_name</strong>
                        <p>repository.description</p>
                    </div>

                    <FiChevronRight size={20} />
                </Link>
            </Issues>
        </Container>
    );
};

export { Repository };
