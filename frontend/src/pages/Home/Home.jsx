import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Layout, 
  Files, 
  Zap, 
  Shield, 
  ArrowRight
} from 'lucide-react';
import {
  HomeContainer,
  Navbar,
  Logo,
  LogoIcon,
  NavLinks,
  NavLink,
  AuthButtons,
  Button,
  Hero,
  HeroTag,
  HeroTitle,
  HeroDescription,
  HeroCtaGroup,
  HeroMockup,
  FeaturesSection,
  SectionHead,
  FeatureGrid,
  FeatureCard,
  FeatureIconBox,
  MainFooter,
  FooterMainContent,
  FooterBrand,
  FooterLinks,
  Copyright
} from './Home.styles';

const Home = () => {
  return (
    <HomeContainer>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      {/* Navbar */}
      <Navbar>
        <Logo to="/">
          <LogoIcon>
            <CheckCircle size={24} />
          </LogoIcon>
          TaskFlow
        </Logo>
        <NavLinks>
          <NavLink href="#features">Recursos</NavLink>
          <NavLink href="#solutions">Soluções</NavLink>
          <NavLink href="#pricing">Preços</NavLink>
        </NavLinks>
        <AuthButtons>
          <Link to="/login">
            <Button className="btn-login">Entrar</Button>
          </Link>
          <Link to="/registro">
            <Button className="btn-primary">Começar Grátis</Button>
          </Link>
        </AuthButtons>
      </Navbar>

      {/* Hero Section */}
      <Hero>
        <HeroTag>Produtividade de alto nível ⚡</HeroTag>
        <HeroTitle>
          Simplifique seu trabalho, <br />
          <span>maximize seus resultados.</span>
        </HeroTitle>
        <HeroDescription>
          A plataforma moderna para gerenciar tarefas e anexos. Organize fluxos de trabalho 
          complexos em segundos e mantenha tudo sob controle.
        </HeroDescription>
        <HeroCtaGroup>
          <Link to="/registro">
            <Button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Criar minha conta <ArrowRight size={18} />
            </Button>
          </Link>
          <Button className="btn-login">Ver Demonstração</Button>
        </HeroCtaGroup>

        {/* Mockup Preview */}
        <HeroMockup>
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
            alt="Dashboard Preview" 
          />
        </HeroMockup>
      </Hero>

      {/* Features Section */}
      <FeaturesSection id="features">
        <SectionHead>
          <h2>Tudo o que você precisa</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: '#64748b' }}>
            Ferramentas poderosas desenhadas para serem intuitivas e rápidas.
          </p>
        </SectionHead>

        <FeatureGrid>
          <FeatureCard>
            <FeatureIconBox>
              <Layout size={28} />
            </FeatureIconBox>
            <h3>Fluxo de Trabalho</h3>
            <p>Gerencie suas tarefas com estados claros e intuitivos para cada etapa do projeto.</p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIconBox>
              <Files size={28} />
            </FeatureIconBox>
            <h3>Gestão de Anexos</h3>
            <p>Anexe documentos, imagens e planilhas diretamente às suas tarefas sem complicações.</p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIconBox>
              <Zap size={28} />
            </FeatureIconBox>
            <h3>Alta Performance</h3>
            <p>Uma interface rápida e responsiva que não atrapalha o seu ritmo de trabalho.</p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIconBox>
              <Shield size={28} />
            </FeatureIconBox>
            <h3>Segurança e Controle</h3>
            <p>Apenas você e as pessoas autorizadas têm acesso aos seus dados e arquivos.</p>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>

      {/* CTA Bottom */}
      <section style={{ padding: '100px 5%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px' }}>
          Pronto para elevar sua produtividade?
        </h2>
        <Link to="/registro">
          <Button className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Começar Gratuitamente Agora
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <MainFooter>
        <FooterMainContent>
          <FooterBrand>
            <h2>TaskFlow</h2>
            <p>A ferramenta definitiva para organização de tarefas e anexos para profissionais modernos.</p>
          </FooterBrand>
          <FooterLinks>
            <h4>Produto</h4>
            <ul>
              <li><a href="#">Recursos</a></li>
              <li><a href="#">Soluções</a></li>
              <li><a href="#">Mobile</a></li>
            </ul>
          </FooterLinks>
          <FooterLinks>
            <h4>Empresa</h4>
            <ul>
              <li><a href="#">Sobre nós</a></li>
              <li><a href="#">Carreiras</a></li>
              <li><a href="#">Privacidade</a></li>
            </ul>
          </FooterLinks>
          <FooterLinks>
            <h4>Suporte</h4>
            <ul>
              <li><a href="#">Central de ajuda</a></li>
              <li><a href="#">Comunidade</a></li>
              <li><a href="#">Contato</a></li>
            </ul>
          </FooterLinks>
        </FooterMainContent>
        <Copyright>
          © 2026 TaskFlow Inc. Todos os direitos reservados.
        </Copyright>
      </MainFooter>
    </HomeContainer>
  );
};

export default Home;
