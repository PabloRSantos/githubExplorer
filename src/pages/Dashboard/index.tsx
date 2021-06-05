import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { Container, Title, Form, Repositories, Error } from './styles';
import logoImg from '../../assets/logo.svg';
import { api } from '../../services/api';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        avatar_url: string;
        login: string;
    };
}

const Dashboard: React.FC = () => {
    const [inputError, setInputError] = useState('');
    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem(
            '@GithubExplorer:repositories',
        );

        if (storagedRepositories) return JSON.parse(storagedRepositories);
        return [];
    });

    useEffect(() => {
        localStorage.setItem(
            '@GithubExplorer:repositories',
            JSON.stringify(repositories),
        );
    }, [repositories]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!newRepo) {
            setInputError('Digite o autor/nome do repositório');
            return;
        }

        try {
            const { data } = await api.get(`repos/${newRepo}`);

            setRepositories((prevState) => [...prevState, data]);
            setNewRepo('');
            setInputError('');
        } catch (error) {
            setInputError('Erro na busca por esse repositório');
        }
    }

    return (
        <Container>
            <img src={logoImg} alt="Github Explorer" />
            <Title>Dashboard</Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                    type="text"
                    placeholder="Digite o nome do repositório"
                />
                <button type="submit">Pesquisar</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {repositories.map((repository) => (
                    <Link
                        key={repository.full_name}
                        to={`/repository/${repository.full_name}`}
                    >
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </Link>
                ))}
            </Repositories>
        </Container>
    );
};

export { Dashboard };
