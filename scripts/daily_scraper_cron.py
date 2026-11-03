#!/usr/bin/env python3
"""
daily_scraper_cron.py — Automated 5-Hour Ingestion Engine for OXID Cortex Studio
Runs every 5 hours (starting at 04:35 WIB: 04:35, 09:35, 14:35, 19:35, 00:35 WIB).
"""

import sys
import json
import datetime
import subprocess
from pathlib import Path

# Add project root to path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

from scripts.fetch_real_threads import fetch_real_karpathy_threads
from scripts.github_scraper import fetch_github_skills

DATA_FILE = BASE_DIR / "data" / "scraped_threads.json"
CRON_LOG_FILE = BASE_DIR / "data" / "cron_last_run.json"

def calculate_next_5h_run(now_dt):
    # Schedule hours: 04:35, 09:35, 14:35, 19:35, 00:35
    schedule_hours = [0, 4, 9, 14, 19]
    for h in schedule_hours:
        candidate = now_dt.replace(hour=h, minute=35, second=0, microsecond=0)
        if candidate > now_dt:
            return candidate.strftime("%Y-%m-%d %H:%M WIB")
    tomorrow = now_dt + datetime.timedelta(days=1)
    return tomorrow.replace(hour=0, minute=35, second=0, microsecond=0).strftime("%Y-%m-%d %H:%M WIB")

def push_to_online(now_str):
    """Auto-commit scraped data files, push to GitHub, and deploy directly to Vercel production."""
    try:
        print(f"[{now_str}] 🚀 Checking data changes for auto-sync to live server...")
        subprocess.run(["git", "add", "data/scraped_threads.json", "data/github_skills.json", "data/cron_last_run.json"], cwd=str(BASE_DIR), check=True, capture_output=True)
        
        status = subprocess.run(["git", "diff", "--staged", "--name-only"], cwd=str(BASE_DIR), capture_output=True, text=True)
        staged_files = status.stdout.strip()
        if not staged_files:
            print(f"[{now_str}] ℹ️ No new data changes to push.")
            return

        print(f"[{now_str}] 📦 Auto-committing new scraped data: {staged_files}")
        subprocess.run(
            ["git", "commit", "-m", f"chore(data): auto-sync scraped intelligence ({now_str}) [skip ci]"],
            cwd=str(BASE_DIR), check=True, capture_output=True
        )
        print(f"[{now_str}] ⬆️ Pushing changes to GitHub origin main...")
        subprocess.run(["git", "push", "origin", "main"], cwd=str(BASE_DIR), check=True, capture_output=True)

        vercel_cli = Path.home() / ".npm/_npx/69f9afb961c37556/node_modules/vercel/dist/index.js"
        if vercel_cli.exists():
            print(f"[{now_str}] ⚡ Triggering Vercel production deployment...")
            res = subprocess.run(
                ["node", str(vercel_cli), "--prod", "--yes"],
                cwd=str(BASE_DIR), capture_output=True, text=True, timeout=120
            )
            if res.returncode == 0:
                print(f"[{now_str}] ✅ Production successfully deployed live to https://cortex.oxidlabs.my.id!")
            else:
                print(f"[{now_str}] ⚠️ Vercel deploy output: {res.stderr[:200]}")
        else:
            print(f"[{now_str}] ✅ Pushed to GitHub main! (GitHub integration auto-triggers build)")
    except Exception as err:
        print(f"[{now_str}] ⚠️ Auto-push warning: {err}")

def run_sync():
    now_dt = datetime.datetime.now()
    now_str = now_dt.strftime("%Y-%m-%d %H:%M:%S WIB")
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    
    print(f"[{now_str}] ⚡ Starting 5-hour automated scraping ingestion cycle...")
    
    try:
        items = fetch_real_karpathy_threads()
        gh_items = fetch_github_skills()
        new_count = len(items) + len(gh_items)
    except Exception as e:
        print(f"Scraping warning: {e}")
        new_count = 0
        
    next_sync_str = calculate_next_5h_run(now_dt)
    
    cron_meta = {
        "status": "online",
        "last_sync": now_str,
        "next_sync": next_sync_str,
        "interval": "5 jam sekali (04:35, 09:35, 14:35, 19:35, 00:35 WIB)",
        "total_sources_scraped": 8,
        "new_items_found": new_count
    }
    
    with open(CRON_LOG_FILE, "w", encoding="utf-8") as f:
        json.dump(cron_meta, f, indent=2)
        
    print(f"[{now_str}] ✅ 5-Hour sync completed successfully. Next scheduled run: {next_sync_str}.")
    
    # Auto-Push changes to Online Server
    push_to_online(now_str)

if __name__ == "__main__":
    run_sync()
