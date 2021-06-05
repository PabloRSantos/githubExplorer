import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { Container, Header, RepositoryInfo, Issues } from './styles';
import { api } from '../../services/api';

interface RepositoryParams {
    repository: string;
}

interface Repository {
    full_name: string;
    description: string;
    stargazers_counter: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        avatar_url: string;
        login: string;
    };
}

interface Issue {
    title: string;
    id: number;
    html_url: string;
    user: {
        login: string;
    };
}

const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();
    const [repository, setRepository] = useState<Repository | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(() => {
        async function loadData() {
            const [repositoryData, issuesData] = await Promise.all([
                api.get(`repos/${params.repository}`),
                api.get(`repos/${params.repository}/issues`),
            ]);

            setRepository(repositoryData.data);
            setIssues(issuesData.data);
        }

        loadData();
    }, [params.repository]);

    return (
        <Container>
            <Header>
                <img src={logoImg} alt="Github Explorer" />
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>

            {repository && (
                <RepositoryInfo>
                    <header>
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repository.stargazers_counter}</strong>
                            <span>Starts</span>
                        </li>

                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>

                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Issues abertas</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}

            <Issues>
                {issues.map((issue) => (
                    <a href={issue.html_url}>
                        <div>
                            <strong>{issue.title}</strong>
                            <p>{issue.user.login}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Issues>
        </Container>
    );
};

export { Repository };
