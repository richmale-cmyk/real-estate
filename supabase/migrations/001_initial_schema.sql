-- ============================================================
-- LuxProp — Initial Schema
-- Run this in the Supabase SQL editor:
-- https://supabase.com/dashboard/project/xuyeyistzenytbbywwlh/sql/new
-- ============================================================

-- ── 1. PROPERTIES ─────────────────────────────────────────
create table if not exists public.properties (
  id          text primary key,
  title       text not null,
  price       bigint not null,
  address     text not null,
  suburb      text not null,
  city        text not null,
  bedrooms    int not null,
  bathrooms   int not null,
  sqm         int not null,
  type        text not null check (type in ('House','Apartment','Villa','Land')),
  status      text not null check (status in ('For Sale','Sold','New')),
  description text not null,
  features    text[] not null default '{}',
  images      text[] not null default '{}',
  agent_name  text not null,
  agent_phone text not null,
  agent_email text not null,
  agent_avatar text not null,
  created_at  timestamptz not null default now()
);

-- Public read access, no public write
alter table public.properties enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename  = 'properties'
      and policyname = 'properties_public_read'
  ) then
    create policy "properties_public_read"
      on public.properties for select
      to anon, authenticated
      using (true);
  end if;
end $$;

-- Grant table access to anon role via Data API
grant select on public.properties to anon;
grant select on public.properties to authenticated;


-- ── 2. ENQUIRIES ──────────────────────────────────────────
create table if not exists public.enquiries (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  email           text not null,
  phone           text not null,
  message         text not null,
  property_title  text,
  created_at      timestamptz not null default now()
);

-- Anyone can insert, nobody can read via API (admin only via dashboard)
alter table public.enquiries enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename  = 'enquiries'
      and policyname = 'enquiries_public_insert'
  ) then
    create policy "enquiries_public_insert"
      on public.enquiries for insert
      to anon, authenticated
      with check (true);
  end if;
end $$;

-- Grant insert access only
grant insert on public.enquiries to anon;
grant insert on public.enquiries to authenticated;


-- ── 3. SEED PROPERTIES ────────────────────────────────────
insert into public.properties
  (id, title, price, address, suburb, city, bedrooms, bathrooms, sqm, type, status, description, features, images, agent_name, agent_phone, agent_email, agent_avatar)
values
  ('prop-001','The Cliffside Residence',4850000,'12 Cliffside Drive','Pacific Palisades','Los Angeles',5,4,620,'Villa','For Sale',
   'A commanding cliffside estate perched above the Pacific with sweeping ocean panoramas. Designed by an award-winning architect, the home seamlessly blends indoor and outdoor living through walls of glass that frame the horizon. Every room is a gallery of natural light and curated materials.',
   array['Ocean view','Infinity pool','Home theatre','Chef''s kitchen','3-car garage','Smart home system','Private gym','Wine cellar'],
   array['https://picsum.photos/seed/prop001a/1200/800','https://picsum.photos/seed/prop001b/1200/800','https://picsum.photos/seed/prop001c/1200/800','https://picsum.photos/seed/prop001d/1200/800'],
   'James Hartwell','+1 (310) 555-0142','james.hartwell@luxprop.com','https://picsum.photos/seed/agent1/200/200'),

  ('prop-002','Manhattan Sky Penthouse',7200000,'1 Park Avenue, PH-40','Midtown','New York',4,3,420,'Apartment','New',
   'An ultra-rare full-floor penthouse crowning one of Manhattan''s most celebrated residential towers. Floor-to-ceiling glass on all four sides delivers 360-degree skyline views stretching from the Hudson to the East River. Interiors are finished with Italian marble, white oak, and bespoke millwork.',
   array['360° city views','Private terrace','Concierge service','Private elevator','Marble bathrooms','Sub-Zero kitchen','Climate control','Storage unit'],
   array['https://picsum.photos/seed/prop002a/1200/800','https://picsum.photos/seed/prop002b/1200/800','https://picsum.photos/seed/prop002c/1200/800','https://picsum.photos/seed/prop002d/1200/800'],
   'Sophia Beaumont','+1 (310) 555-0187','sophia.beaumont@luxprop.com','https://picsum.photos/seed/agent2/200/200'),

  ('prop-003','Napa Valley Estate',9500000,'800 Vineyard Ridge Road','St. Helena','Napa Valley',7,6,1100,'Villa','For Sale',
   'Set amid 14 acres of working vineyards, this estate is a masterwork of Californian luxury living. The main residence is complemented by a guest cottage, barrel cellar, and professional tasting room. Heritage oak trees frame a resort-style pool and outdoor kitchen designed for year-round entertaining.',
   array['14-acre vineyard','Guest cottage','Barrel cellar','Resort pool','Outdoor kitchen','Tasting room','Helicopter pad','Staff quarters'],
   array['https://picsum.photos/seed/prop003a/1200/800','https://picsum.photos/seed/prop003b/1200/800','https://picsum.photos/seed/prop003c/1200/800','https://picsum.photos/seed/prop003d/1200/800'],
   'Marcus Chen','+1 (310) 555-0231','marcus.chen@luxprop.com','https://picsum.photos/seed/agent3/200/200'),

  ('prop-004','Tribeca Loft',3200000,'86 Franklin Street, 5F','Tribeca','New York',3,2,280,'Apartment','Sold',
   'A quintessential Tribeca loft occupying the entire fifth floor of a landmark cast-iron building. Soaring 14-foot ceilings, original exposed brick, and massive arched windows create an atmosphere that is simultaneously historic and contemporary. The open-plan layout is a canvas for any aesthetic.',
   array['14ft ceilings','Exposed brick','Cast-iron building','Open plan','Private storage','Bike storage','Doorman','Roof access'],
   array['https://picsum.photos/seed/prop004a/1200/800','https://picsum.photos/seed/prop004b/1200/800','https://picsum.photos/seed/prop004c/1200/800','https://picsum.photos/seed/prop004d/1200/800'],
   'James Hartwell','+1 (310) 555-0142','james.hartwell@luxprop.com','https://picsum.photos/seed/agent1/200/200'),

  ('prop-005','Malibu Beachfront',12800000,'21 Carbon Beach','Carbon Beach','Malibu',6,5,780,'House','For Sale',
   'Direct on Carbon Beach — the most exclusive stretch of sand in Malibu — this newly rebuilt residence redefines coastal luxury. An airy open floor plan dissolves the boundary between interior and the Pacific beyond. The wraparound deck, private beach access, and pool deck create a private resort on one of the world''s most coveted shores.',
   array['Direct beach access','Pacific frontage','Wraparound deck','Pool & spa','4-car garage','Guest suite','Outdoor shower','Chef''s kitchen'],
   array['https://picsum.photos/seed/prop005a/1200/800','https://picsum.photos/seed/prop005b/1200/800','https://picsum.photos/seed/prop005c/1200/800','https://picsum.photos/seed/prop005d/1200/800'],
   'Sophia Beaumont','+1 (310) 555-0187','sophia.beaumont@luxprop.com','https://picsum.photos/seed/agent2/200/200'),

  ('prop-006','Beverly Hills Modern',5600000,'910 Benedict Canyon Drive','Beverly Hills','Los Angeles',5,5,540,'House','New',
   'A boldly geometric new build in the heart of Beverly Hills, where clean lines, raw concrete, and warm timber create a residence of quiet drama. The house unfolds around a central courtyard and negative-edge pool, with every space oriented to maximise canyon and city views.',
   array['Negative-edge pool','Canyon views','Courtyard design','Smart home','Media room','Walk-in wardrobes','2-car garage','Landscaped gardens'],
   array['https://picsum.photos/seed/prop006a/1200/800','https://picsum.photos/seed/prop006b/1200/800','https://picsum.photos/seed/prop006c/1200/800','https://picsum.photos/seed/prop006d/1200/800'],
   'Marcus Chen','+1 (310) 555-0231','marcus.chen@luxprop.com','https://picsum.photos/seed/agent3/200/200'),

  ('prop-007','SoHo Design Apartment',2800000,'155 Wooster Street, 3A','SoHo','New York',2,2,210,'Apartment','For Sale',
   'A gallery-inspired apartment in the heart of SoHo, thoughtfully renovated by a noted interior designer. Warm walnut floors, polished plaster walls, and custom cabinetry flow seamlessly through the open plan.',
   array['Designer renovation','Custom millwork','Polished plaster','Walnut floors','Live-work zoning','Gallery ceilings','Central HVAC','Private storage'],
   array['https://picsum.photos/seed/prop007a/1200/800','https://picsum.photos/seed/prop007b/1200/800','https://picsum.photos/seed/prop007c/1200/800','https://picsum.photos/seed/prop007d/1200/800'],
   'James Hartwell','+1 (310) 555-0142','james.hartwell@luxprop.com','https://picsum.photos/seed/agent1/200/200'),

  ('prop-008','Aspen Mountain Chalet',8900000,'45 Snowmass Road','Snowmass Village','Aspen',6,5,720,'Villa','For Sale',
   'A supreme ski-in/ski-out chalet commanding an unrivalled position on the slopes of Aspen Mountain. The home wraps its guests in rough-hewn stone, reclaimed timber, and a palette drawn directly from the surrounding alpine landscape.',
   array['Ski-in/ski-out','Mountain views','Double-height fireplace','Steam sauna','Boot room','Heated driveway','Caretaker suite','Wine room'],
   array['https://picsum.photos/seed/prop008a/1200/800','https://picsum.photos/seed/prop008b/1200/800','https://picsum.photos/seed/prop008c/1200/800','https://picsum.photos/seed/prop008d/1200/800'],
   'Marcus Chen','+1 (310) 555-0231','marcus.chen@luxprop.com','https://picsum.photos/seed/agent3/200/200'),

  ('prop-009','Miami Waterfront Residence',6400000,'2401 Bay Shore Drive','Coconut Grove','Miami',5,4,590,'House','New',
   'Anchored on the serene shores of Biscayne Bay, this contemporary tropical residence merges indoor living with the lush landscape beyond. Brazilian hardwood, natural stone, and vaulted ceilings celebrate material richness throughout.',
   array['Private dock','Bay views','Outdoor pavilion','Tropical landscaping','Pool & spa','Boat lift','Gated entry','Summer kitchen'],
   array['https://picsum.photos/seed/prop009a/1200/800','https://picsum.photos/seed/prop009b/1200/800','https://picsum.photos/seed/prop009c/1200/800','https://picsum.photos/seed/prop009d/1200/800'],
   'Sophia Beaumont','+1 (310) 555-0187','sophia.beaumont@luxprop.com','https://picsum.photos/seed/agent2/200/200'),

  ('prop-010','Greenwich Colonial Estate',5100000,'34 Round Hill Road','Round Hill','Greenwich',7,6,860,'House','Sold',
   'A grand colonial estate set on 3.4 acres of manicured grounds in Greenwich''s most prestigious neighbourhood. The main residence exudes timeless elegance with a formal entry gallery, wood-panelled library, and a conservatory.',
   array['3.4 acres','Tennis court','Pool house','Library','Conservatory','Guest apartment','4-car garage','Formal gardens'],
   array['https://picsum.photos/seed/prop010a/1200/800','https://picsum.photos/seed/prop010b/1200/800','https://picsum.photos/seed/prop010c/1200/800','https://picsum.photos/seed/prop010d/1200/800'],
   'James Hartwell','+1 (310) 555-0142','james.hartwell@luxprop.com','https://picsum.photos/seed/agent1/200/200'),

  ('prop-011','Sunset Strip Retreat',3750000,'9080 Sunset Boulevard','West Hollywood','Los Angeles',4,3,380,'House','For Sale',
   'A sleek Hollywood Hills hideaway concealed behind mature hedging on the iconic Sunset Strip. Walls of glass disappear into pocket doors to reveal a private canyon and shimmering city views below.',
   array['Canyon views','City light views','Disappearing walls','Plunge pool','Rooftop terrace','Recording room','Heated floors','Gated entry'],
   array['https://picsum.photos/seed/prop011a/1200/800','https://picsum.photos/seed/prop011b/1200/800','https://picsum.photos/seed/prop011c/1200/800','https://picsum.photos/seed/prop011d/1200/800'],
   'Marcus Chen','+1 (310) 555-0231','marcus.chen@luxprop.com','https://picsum.photos/seed/agent3/200/200'),

  ('prop-012','Palm Beach Mediterranean',14500000,'135 North Ocean Boulevard','Palm Beach Island','Palm Beach',8,7,1250,'Villa','For Sale',
   'A palatial oceanfront estate in the Mediterranean Revival style, occupying one of the last remaining large private parcels on Palm Beach Island. Lavished with Venetian plaster, hand-painted tiles, and vaulted Moorish ceilings.',
   array['Ocean frontage','Private beach','Loggia & terrace','Ballroom','Polo room','Staff wing','Garage for 6','Tennis court'],
   array['https://picsum.photos/seed/prop012a/1200/800','https://picsum.photos/seed/prop012b/1200/800','https://picsum.photos/seed/prop012c/1200/800','https://picsum.photos/seed/prop012d/1200/800'],
   'Sophia Beaumont','+1 (310) 555-0187','sophia.beaumont@luxprop.com','https://picsum.photos/seed/agent2/200/200')

on conflict (id) do nothing;
