-- =============================================
-- SCHEMA ELITE EXPERTISE CI — Supabase / PostgreSQL
-- =============================================

-- Table marques
CREATE TABLE marques (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table categories (avec support sous-catégories)
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  ordre INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table produits
CREATE TABLE produits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  prix DECIMAL(10,2),
  image_url TEXT,
  images TEXT[], -- tableau d'URLs pour plusieurs images
  marque_id UUID REFERENCES marques(id) ON DELETE SET NULL,
  categorie_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  statut TEXT CHECK (statut IN ('en_stock', 'en_vente', 'rupture')) DEFAULT 'en_stock',
  est_vedette BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table devis (formulaire de contact)
CREATE TABLE devis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT,
  entreprise TEXT,
  message TEXT NOT NULL,
  produit_id UUID REFERENCES produits(id) ON DELETE SET NULL,
  statut TEXT CHECK (statut IN ('nouveau', 'lu', 'traite')) DEFAULT 'nouveau',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- DONNÉES DE BASE — Catégories
-- =============================================
INSERT INTO categories (nom, slug, parent_id, ordre) VALUES
  ('Sécurité incendie', 'securite-incendie', NULL, 1),
  ('Détection de gaz', 'detection-de-gaz', NULL, 2),
  ('EPI', 'epi', NULL, 3),
  ('Équipements de signalisation', 'signalisation', NULL, 4);

-- Sous-catégories Sécurité incendie
INSERT INTO categories (nom, slug, parent_id, ordre)
SELECT 'Extincteur', 'extincteur', id, 1 FROM categories WHERE slug = 'securite-incendie';
INSERT INTO categories (nom, slug, parent_id, ordre)
SELECT 'RIA', 'ria', id, 2 FROM categories WHERE slug = 'securite-incendie';
INSERT INTO categories (nom, slug, parent_id, ordre)
SELECT 'Lance incendie', 'lance-incendie', id, 3 FROM categories WHERE slug = 'securite-incendie';

-- Sous-catégories EPI
INSERT INTO categories (nom, slug, parent_id, ordre)
SELECT 'Chaussure de sécurité', 'chaussure-securite', id, 1 FROM categories WHERE slug = 'epi';
INSERT INTO categories (nom, slug, parent_id, ordre)
SELECT 'Casque de sécurité', 'casque-securite', id, 2 FROM categories WHERE slug = 'epi';
INSERT INTO categories (nom, slug, parent_id, ordre)
SELECT 'Protection auditive', 'protection-auditive', id, 3 FROM categories WHERE slug = 'epi';
INSERT INTO categories (nom, slug, parent_id, ordre)
SELECT 'Vêtement de travail', 'vetement-travail', id, 4 FROM categories WHERE slug = 'epi';

-- =============================================
-- RLS (Row Level Security)
-- =============================================

-- Lecture publique sur produits, categories, marques
ALTER TABLE produits ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE marques ENABLE ROW LEVEL SECURITY;
ALTER TABLE devis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique produits" ON produits FOR SELECT USING (true);
CREATE POLICY "Lecture publique categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Lecture publique marques" ON marques FOR SELECT USING (true);

-- Insertion publique des devis (formulaire contact)
CREATE POLICY "Insertion publique devis" ON devis FOR INSERT WITH CHECK (true);

-- Admin seulement pour modification (via auth Supabase)
CREATE POLICY "Admin produits" ON produits FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin marques" ON marques FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin devis lecture" ON devis FOR SELECT USING (auth.role() = 'authenticated');
